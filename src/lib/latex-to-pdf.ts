import { execSync } from 'child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

/**
 * Converts LaTeX source to PDF using pdflatex
 * @param latexSource - The LaTeX source code as a string
 * @returns Buffer containing the PDF file
 */
export function latexToPdf(latexSource: string): Buffer {
    // Create a temporary directory for compilation
    const tempDir = mkdtempSync(join(tmpdir(), 'latex-'))
    const texFile = join(tempDir, 'document.tex')
    const pdfFile = join(tempDir, 'document.pdf')

    try {
        // Write LaTeX source to temp file
        writeFileSync(texFile, latexSource, 'utf-8')

        // Run pdflatex twice (first for references, second for TOC/references)
        // -interaction=nonstopmode prevents hanging on errors
        // -halt-on-error stops compilation on first error
        const pdflatexCmd = 'pdflatex'
        const options = {
            cwd: tempDir,
            stdio: 'pipe' as const,
            encoding: 'utf-8' as const
        }

        try {
            execSync(
                `${pdflatexCmd} -interaction=nonstopmode -halt-on-error document.tex`,
                options
            )
            // Run twice to resolve references
            execSync(
                `${pdflatexCmd} -interaction=nonstopmode -halt-on-error document.tex`,
                options
            )
        } catch (execError: unknown) {
            // Try to read the log file for better error messages
            const logFile = join(tempDir, 'document.log')
            let logContent = ''
            try {
                logContent = readFileSync(logFile, 'utf-8')
            } catch {
                // Log file might not exist
            }
            const errorMessage =
                execError instanceof Error ? execError.message : String(execError)
            throw new Error(
                `LaTeX compilation failed: ${errorMessage}\n${logContent}`
            )
        }

        // Read the generated PDF
        const pdfBuffer = readFileSync(pdfFile)

        return pdfBuffer
    } finally {
        // Cleanup: remove temporary directory and all its contents
        try {
            rmSync(tempDir, { recursive: true, force: true })
        } catch (cleanupError) {
            console.warn('Failed to cleanup temp directory:', cleanupError)
        }
    }
}

/**
 * Sample LaTeX document for testing
 */
export const SAMPLE_LATEX = String.raw`\documentclass[letterpaper,11pt]{article}

\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage[hidelinks]{hyperref}
\usepackage{enumitem}

\pagestyle{empty}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\titlerule \vspace{-5pt}]

\begin{document}

\begin{center}
    \textbf{\Huge \scshape John Doe} \\ \vspace{1pt}
    \small 123-456-7890 $|$ \href{mailto:john@example.com}{\underline{john@example.com}} $|$
    \href{https://linkedin.com/in/johndoe}{\underline{LinkedIn}} $|$
    \href{https://github.com/johndoe}{\underline{GitHub}}
\end{center}

\section{Education}
  \textbf{University of Example} \hfill Vancouver, BC \\
  \textit{Bachelor of Science in Computer Science} \hfill Expected May 2026

\section{Experience}
  \textbf{Software Developer} \hfill June 2023 -- Present \\
  \textit{Tech Company Inc.} \hfill Vancouver, BC
  \begin{itemize}[leftmargin=0.15in]
    \item Developed full-stack web applications using React and Node.js
    \item Implemented RESTful APIs serving over 10,000 daily active users
    \item Optimized database queries reducing response time by 40\%
  \end{itemize}

\section{Projects}
  \textbf{Resume Generator} \hfill January 2025 -- Present
  \begin{itemize}[leftmargin=0.15in]
    \item Built an AI-powered resume builder using Next.js and OpenAI
    \item Integrated LaTeX PDF generation with automated formatting
    \item Deployed on AWS with CI/CD pipeline
  \end{itemize}

\section{Skills}
  \textbf{Languages:} JavaScript, TypeScript, Python, Java \\
  \textbf{Technologies:} React, Next.js, Node.js, Docker, AWS, PostgreSQL

\end{document}`

export const RESUME_TEMPLATE = `
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
