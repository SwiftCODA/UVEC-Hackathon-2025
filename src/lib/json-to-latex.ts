import nunjucks from 'nunjucks'
// import { z } from 'zod'

// // Zod schemas for validation
// const ExperienceSchema = z.object({
//     job_title: z.string().default(''),
//     company_name: z.string().default(''),
//     location: z.string().default(''),
//     start_date: z.string().default(''),
//     end_date: z.string().default(''),
//     accomplishments: z.array(z.string()).default([])
// })

// const EducationSchema = z.object({
//     credential: z.string().default(''),
//     university_college_name: z.string().default(''),
//     location: z.string().default(''),
//     graduation_date: z.string().default('')
// })

// const ProjectSchema = z.object({
//     project_name: z.string().default(''),
//     start_date: z.string().default(''),
//     end_date: z.string().default(''),
//     accomplishments: z.array(z.string()).default([])
// })

// const ResumeDataSchema = z.object({
//     first_name: z.string(),
//     last_name: z.string(),
//     city: z.string().default(''),
//     state_province_abbreviation: z.string().default(''),
//     email: z.string().default(''),
//     phone_number: z.string().default(''),
//     github_url: z.string().default(''),
//     linkedin_url: z.string().default(''),
//     education: z.array(EducationSchema).default([]),
//     experience: z.array(ExperienceSchema).default([]),
//     projects: z.array(ProjectSchema).default([])
// })

// type ResumeData = z.infer<typeof ResumeDataSchema>

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

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

{% raw %}
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
{% endraw %}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape {{ first_name | latex }} {{ last_name | latex }}} \\\\ \\vspace{1pt}
    \\small {% if phone_number %}{{ phone_number | latex }}{% endif %}{% if email %} $|$ \\href{mailto:{{ email | latex }}}{\\underline{ {{ email | latex }} }}{% endif %}{% if linkedin_url %} $|$ \\href{ {{ linkedin_url | latex }} }{\\underline{LinkedIn}}{% endif %}{% if github_url %} $|$ \\href{ {{ github_url | latex }} }{\\underline{GitHub}}{% endif %}
\\end{center}

{% if education.length > 0 %}
\\section{Education}
  \\resumeSubHeadingListStart
{% for edu in education %}
    \\resumeSubheading
      { {{ edu.university_college_name | latex }} }{ {{ edu.location | latex }} }
      { {{ edu.credential | latex }} }{% if edu.expected_graduation_date %}{ Expected {{ edu.expected_graduation_date | formatDate }} }{% else %}{ {{ edu.graduation_date | formatDate }} }{% endif %}
{% endfor %}
  \\resumeSubHeadingListEnd
{% endif %}

{% if experience.length > 0 %}
\\section{Experience}
  \\resumeSubHeadingListStart
{% for exp in experience %}
    \\resumeSubheading
      { {{ exp.job_title | latex }} }{ {{ exp.start_date | formatDate }} -- {{ exp.end_date | formatDate }} }
      { {{ exp.company_name | latex }} }{ {{ exp.location | latex }} }
      {% if exp.accomplishments.length > 0 %}\\resumeItemListStart
{% for acc in exp.accomplishments %}
        \\resumeItem{ {{ acc | latex }} }
{% endfor %}
      \\resumeItemListEnd{% endif %}
{% endfor %}
  \\resumeSubHeadingListEnd
{% endif %}

{% if projects.length > 0 %}
\\section{Projects}
  \\resumeSubHeadingListStart
{% for proj in projects %}
    \\resumeProjectHeading
      {\\textbf{ {{ proj.project_name | latex }} }}{ {{ proj.start_date | formatDate }} -- {{ proj.end_date | formatDate }} }
      {% if proj.accomplishments.length > 0 %}\\resumeItemListStart
{% for acc in proj.accomplishments %}
        \\resumeItem{ {{ acc | latex }} }
{% endfor %}
      \\resumeItemListEnd{% endif %}
{% endfor %}
  \\resumeSubHeadingListEnd
{% endif %}

\\end{document}`.trim()

export const generateLaTeX = (jsonData: object): string => {
    return env.renderString(RESUME_TEMPLATE, jsonData)
}

// export class ResumeGenerator {
//     private data: ResumeData

// 	public static instance: ResumeGenerator = new ResumeGenerator({})

//     constructor(jsonData: unknown) {
//         // Automatically validates with Zod
//         this.data = ResumeDataSchema.parse(jsonData)
//     }

//     // Generate LaTeX from template
//     generateLaTeX(): string {
//         return env.renderString(RESUME_TEMPLATE, this.data)
//     }

//     // Generate PDF using local pdflatex
//     async generatePDF(outputPath: string = './resume.pdf'): Promise<string> {
//         const { execSync } = await import('child_process')
//         const fs = await import('fs/promises')
//         const path = await import('path')
//         const os = await import('os')

//         // Use full path if pdflatex not in PATH
//         const pdflatexCmd = '/Library/TeX/texbin/pdflatex'

//         // Create temp directory for LaTeX compilation
//         const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resume-'))
//         const texFile = path.join(tempDir, 'resume.tex')
//         const pdfFile = path.join(tempDir, 'resume.pdf')

//         try {
//             // Write LaTeX to temp file
//             const latex = this.generateLaTeX()
//             await fs.writeFile(texFile, latex, 'utf-8')

//             // Run pdflatex with full path
//             execSync(
//                 `${pdflatexCmd} -interaction=nonstopmode -output-directory="${tempDir}" "${texFile}"`,
//                 {
//                     stdio: 'pipe'
//                 }
//             )
//             execSync(
//                 `${pdflatexCmd} -interaction=nonstopmode -output-directory="${tempDir}" "${texFile}"`,
//                 {
//                     stdio: 'pipe'
//                 }
//             )

//             // Move PDF to desired output location
//             await fs.copyFile(pdfFile, outputPath)

//             // Cleanup temp directory
//             await fs.rm(tempDir, { recursive: true, force: true })

//             return outputPath
//         } catch (error) {
//             // Cleanup on error
//             await fs
//                 .rm(tempDir, { recursive: true, force: true })
//                 .catch(() => {})
//             throw new Error(`PDF generation failed: ${error}`)
//         }
//     }

//     // Save to .tex file (optional)
//     async saveToFile(filepath: string): Promise<void> {
//         const latex = this.generateLaTeX()
//         const fs = await import('fs/promises')
//         await fs.writeFile(filepath, latex, 'utf-8')
//     }

//     // Fetch JSON from API (optional)
//     static async fetchResumeData(url: string): Promise<ResumeGenerator> {
//         const response = await fetch(url)
//         const json = await response.json()
//         return new ResumeGenerator(json)
//     }
// }
