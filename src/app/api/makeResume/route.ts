import { OpenAIPrompts } from '@/lib/openai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        console.log(body)

        const input = OpenAIPrompts.buildInputPrompt({
            firstName: 'Liam',
            lastName: 'Sebestyen',
            city: 'Vancouver',
            stateProvinceAbbreviation: 'BC',
            githubUsername: 'liamsebestyen',
            linkedinUrl: 'https://www.linkedin.com/in/liamsebestyen/',
            phoneNumber: '123-456-7890',
            emailAddress: 'liam@gmail.com',
            education: [
                {
                    credential: 'Bachelor',
                    faculty: 'Engineering',
                    major: 'Software Engineering',
                    institution: 'University of Victoria',
                    graduationDate: '2026',
                    city: 'Victoria',
                    stateProvinceAbbreviation: 'BC'
                }
            ],
            experience: [
                {
                    jobTitle: 'Full-Stack Developer',
                    companyName: 'Tech Solutions Inc.',
                    startDate: 'June 2022',
                    endDate: 'August 2023',
                    accomplishments:
                        'built stuff for fire crews. made hotspot system used by cal fire that helped them respond faster, and a 3d clustering thing for ir data so they can find hotspots quicker. redid the perimeter mapping tool so they can see distances between hotspots and plan hoses better. made colorfinder tool in react/typescript that helps search and rescue find anomalies. also a panorama viewer thing for fire sites, like 3d view over 100 acres. set up docker/aws/nginx pipelines to auto deploy changes. worked with designer on ui and speed optimizations for about 10k users. talked with fire teams and engineers a lot to figure out what tools they actually need.',
                    city: 'Vancouver',
                    stateProvinceAbbreviation: 'BC'
                }
            ],
            projects: [
                {
                    title: 'Aperture AI',
                    startDate: 'July 2025',
                    accomplishments:
                        'i started it with a few friends in 2025, kinda like an ai photo assistant that makes lightroom presets when you type a prompt. i lead the tech side and manage 3 devs. backend is on aws with lambda s3 socket.io stuff for realtime uploads. i connected openai moderation so flagged images delete themselves. fine tuned gpt-4.1 mini to figure out editing style or camera info from photos. also built a free/paid tier system with rate limits. made it so presets generate live with embeddings + keyword matching.'
                }
            ]
        })
        console.log(JSON.stringify(input, null, 2))

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

        // TODO: Make LaTeX doc from payload

        // TODO: NextResponse send the PDF file.

        return NextResponse.json(payload, { status: 200 })
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
