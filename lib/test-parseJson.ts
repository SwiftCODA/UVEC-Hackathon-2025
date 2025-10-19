import { ResumeGenerator } from './parseJson'

// Your sample JSON
const sampleData = {
    first_name: 'Liam',
    last_name: 'Sebestyen',
    city: 'Vancouver',
    state_province_abbreviation: 'BC',
    email: 'liam@gmail.com',
    phone_number: '123-456-7890',
    github_url: 'https://github.com/liamsebestyen',
    linkedin_url: 'https://www.linkedin.com/in/liamsebestyen/',

    education: [
        {
            credential: 'B.Eng in Software Engineering',
            university_college_name: 'University of Victoria',
            location: 'Victoria, BC',
            graduation_date: '2026-01-01'
        },
        {
            credential: 'High School Diploma',
            university_college_name: 'Oak Bay High School',
            location: 'Victoria, BC',
            graduation_date: '2021-06-30'
        }
    ],

    experience: [
        {
            job_title: 'Full-Stack Developer',
            company_name: 'Tech Solutions Inc.',
            location: 'Vancouver, BC',
            start_date: '2022-06-01',
            end_date: '2023-08-31',
            accomplishments: [
                'Developed a hotspot system used by cal fire to improve response times',
                'Created a 3d clustering tool for ir data enabling quicker hotspot identification',
                'Redesigned perimeter mapping tool to visualize distances between hotspots for better planning',
                'Built a colorfinder React/TypeScript tool to aid search and rescue operations',
                'Designed a panorama viewer for fire sites to visualize 3d views over large areas',
                'Automated deployment pipelines with Docker AWS Nginx to streamline updates',
                'Collaborated with designers to optimize UI and performance for tens of thousands of users',
                'Engaged with fire teams and engineers to identify and develop essential tools'
            ]
        },
        {
            job_title: 'Software Engineer',
            company_name: 'Cal Fire',
            location: 'California, USA',
            start_date: '2022-01-01',
            end_date: '2023-12-31',
            accomplishments: [
                'Developed a hotspot system used by Cal Fire that improved response times across multiple incidents',
                'Engineered a 3D clustering feature for IR data enabling faster hotspot detection during firefighting operations',
                'Redesigned perimeter mapping tool to display distances between hotspots aiding firefighting planning',
                'Built a color finder tool in React and TypeScript to assist search and rescue teams in locating anomalies',
                'Created a panorama viewer for fire sites offering a 3D over 100-acre site visualization for strategic assessment',
                'Set up Docker, AWS, and Nginx pipelines to automate deployment processes ensuring rapid updates',
                'Collaborated with UI designers and optimized system performance for approximately 10,000 users',
                'Engaged with fire teams and engineers to identify essential tools tailored to operational needs'
            ]
        },
        {
            job_title: 'Software Engineering Intern',
            company_name: 'Apple',
            location: 'Miami, FL',
            start_date: '2024-05-01',
            end_date: '2024-08-31',
            accomplishments: [
                'Developed internal tooling for iCloud systems to automate performance testing workflows',
                'Improved efficiency of build pipelines using TypeScript and Node.js, reducing build times by 20%',
                'Collaborated with cross-functional teams to implement real-time system metrics in Grafana',
                'Optimized REST API endpoints used by millions of iCloud devices through caching and load balancing strategies',
                'Contributed to CI/CD improvements in Jenkins and GitHub Actions for multi-region deployments'
            ]
        }
    ],

    projects: [
        {
            project_name: 'Aperture AI',
            start_date: '2025-07-01',
            end_date: '2025-12-31',
            accomplishments: [
                'Founded Aperture AI as an AI photo assistant that creates Lightroom presets from prompts',
                'Led the technology team and managed 3 developers',
                'Implemented backend on AWS with Lambda S3 socket IO for real-time uploads',
                'Integrated OpenAI moderation for automatic image deletion of flagged content',
                'Fine-tuned GPT-4 mini for style and camera info recognition from photos',
                'Developed a freemium model with rate limits and live preset generation using embeddings and keyword matching'
            ]
        },
        {
            project_name: 'Varsity Vantage',
            start_date: '2023-01-01',
            end_date: '2023-12-31',
            accomplishments: [
                'Built centralized athletics data platform for university sports departments using Next.js and Supabase',
                'Designed REST APIs for managing athlete and coach dashboards with role-based permissions',
                'Integrated Shadcn/UI and TailwindCSS for responsive front-end interfaces',
                'Deployed platform on Vercel and configured Supabase authentication with OAuth providers',
                'Implemented analytics dashboards for tracking team performance metrics'
            ]
        }
    ]
}

// Test the generator - wrapped in async function
;(async () => {
    try {
        console.log('🧪 Testing ResumeGenerator...\n')

        const generator = new ResumeGenerator(sampleData)
        console.log('✅ JSON validation passed!\n')

        // Generate LaTeX
        const latex = generator.generateLaTeX()
        console.log('✅ LaTeX generated successfully!\n')

        // Save .tex file
        await generator.saveToFile('./resume-output.tex')
        console.log('✅ Saved to resume-output.tex\n')

        // Generate PDF
        const pdfPath = await generator.generatePDF('./resume-output.pdf')
        console.log(`✅ PDF generated: ${pdfPath}\n`)

        console.log('🎉 All tests passed!')
    } catch (error) {
        console.error('❌ Test failed:', error)
        process.exit(1)
    }
})()
