import { latexToPdf } from '@/lib/latex-to-pdf'
import { OpenAIPrompts } from '@/lib/openai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generateLaTeX } from '../../../lib/json-to-latex'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const input = OpenAIPrompts.buildInputPrompt(body)

        const response = await openai.responses.create({
            prompt: {
                id: process.env.OPENAI_PROMPT_ID as string
            },
            input: [
                {
                    type: 'message',
                    role: 'user',
                    content: input
                }
            ]
        })

        if (!response.output.length) throw 'No output from OpenAI'
        const output = response.output[0]
        if (output.type !== 'message')
            throw 'Unexpected output type from OpenAI'
        const content = output.content[0]
        if (content.type !== 'output_text')
            throw 'Unexpected content type from OpenAI'
        const payload = JSON.parse(content.text)

        const latex = generateLaTeX(payload)
        const pdfBuffer = latexToPdf(latex)

        const firstName = payload.first_name
        const lastName = payload.last_name
        const fileName = `${
            !!firstName && !!lastName ? firstName + lastName + '_' : ''
        }Resume.pdf`

        // Return PDF file as response
        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`
            }
        })
    } catch (error) {
        console.error('Error in /api/makeResume:', error)
        return NextResponse.json(
            {
                error: 'An internal server error occurred.'
            },
            { status: 500 }
        )
    }
}
