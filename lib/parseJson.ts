import nunjucks from 'nunjucks'
import { z } from 'zod'

// Zod schemas for validation
const ExperienceSchema = z.object({
    job_title: z.string(),
    company_name: z.string(),
    location: z.string(),
    start_date: z.string(),
    end_date: z.string().optional(),
    accomplishments: z.array(z.string())
})

const EducationSchema = z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    graduation_date: z.string(),
    gpa: z.string().optional()
})

const ResumeDataSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    city: z.string(),
    state_province_abbreviation: z.string(),
    email: z.string().email(),
    phone_number: z.string().optional(),
    github_url: z.string().url().optional(),
    linkedin_url: z.string().url().optional(),
    education: z.array(EducationSchema),
    experience: z.array(ExperienceSchema)
})

type ResumeData = z.infer<typeof ResumeDataSchema>

// Configure Nunjucks environment with custom filters
const env = new nunjucks.Environment(null, { autoescape: false })

// LaTeX escape filter
env.addFilter('latex', (str: string) => {
    if (!str) return ''
    return str
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/[&%$#_{}]/g, '\\$&')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}')
})

// Date formatting filter
env.addFilter('formatDate', (dateStr: string) => {
    if (!dateStr) return 'Present'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
})

// LaTeX resume template
const RESUME_TEMPLATE = `
\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\begin{document}

\\begin{center}
{\\Large \\textbf{ {{ first_name | latex }} {{ last_name | latex }} }}\\\\[0.2cm]
{{ city | latex }}, {{ state_province_abbreviation | latex }} \\quad
{{ email | latex }}
{% if phone_number %} \\quad {{ phone_number | latex }}{% endif %}
{% if github_url %} \\quad \\href{ {{ github_url }} }{GitHub}{% endif %}
{% if linkedin_url %} \\quad \\href{ {{ linkedin_url }} }{LinkedIn}{% endif %}
\\end{center}

{% if education.length > 0 %}
\\section*{Education}
\\hrule
\\vspace{0.2cm}
{% for edu in education %}
\\textbf{ {{ edu.degree | latex }} } \\hfill {{ edu.graduation_date | formatDate }}\\\\
{{ edu.institution | latex }}, {{ edu.location | latex }}
{% if edu.gpa %} \\hfill GPA: {{ edu.gpa | latex }}{% endif %}
\\vspace{0.2cm}
{% endfor %}
{% endif %}

{% if experience.length > 0 %}
\\section*{Experience}
\\hrule
\\vspace{0.2cm}
{% for exp in experience %}
\\textbf{ {{ exp.job_title | latex }} } \\hfill {{ exp.start_date | formatDate }} -- {{ exp.end_date | formatDate }}\\\\
{{ exp.company_name | latex }}, {{ exp.location | latex }}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=0pt]
{% for acc in exp.accomplishments %}
\\item {{ acc | latex }}
{% endfor %}
\\end{itemize}
\\vspace{0.2cm}
{% endfor %}
{% endif %}

\\end{document}
`.trim()

export class ResumeGenerator {
    private data: ResumeData

    constructor(jsonData: unknown) {
        // Automatically validates with Zod
        this.data = ResumeDataSchema.parse(jsonData)
    }

    // Generate LaTeX from template
    generateLaTeX(): string {
        return env.renderString(RESUME_TEMPLATE, this.data)
    }

    // Save to .tex file (optional)
    async saveToFile(filepath: string): Promise<void> {
        const latex = this.generateLaTeX()
        const fs = await import('fs/promises')
        await fs.writeFile(filepath, latex, 'utf-8')
    }

    // Fetch JSON from API (optional)
    static async fetchResumeData(url: string): Promise<ResumeGenerator> {
        const response = await fetch(url)
        const json = await response.json()
        return new ResumeGenerator(json)
    }
}
