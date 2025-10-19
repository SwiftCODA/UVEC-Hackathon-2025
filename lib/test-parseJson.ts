import { ResumeGenerator } from './parseJson'

// Your sample JSON
const sampleData = {
    first_name: 'Liam',
    last_name: 'Sebestyen',
    city: 'Victoria',
    state_province_abbreviation: 'BC',
    email: 'liam@uvic.ca',
    phone_number: '',
    github_url: 'https://github.com/liamsebestyen',
    linkedin_url: 'https://www.linkedin.com/in/liamsebestyen/',

    // ⬇️ Education matches your EducationSchema
    education: [
        {
            degree: 'Bachelor of Engineering, Software Engineering',
            institution: 'University of Victoria',
            location: 'Victoria, BC',
            graduation_date: '2025-04-30', // ISO-ish string; change to whatever format you prefer
            gpa: '3.7/4.0'
        },
        {
            degree: 'High School Diploma',
            institution: 'Oak Bay High School',
            location: 'Victoria, BC',
            graduation_date: '2021-06-30',
            gpa: '4.0/4.0'
        }
    ],

    // ⬇️ Experience already matches your ExperienceSchema
    experience: [
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
        },
        {
            job_title: 'Full Stack Developer',
            company_name: 'Varsity Vantage',
            location: 'Victoria, BC',
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

        // Create generator
        const generator = new ResumeGenerator(sampleData)
        console.log('✅ JSON validation passed!\n')

        // Generate LaTeX
        const latex = generator.generateLaTeX()
        console.log('✅ LaTeX generated successfully!\n')
        console.log('📄 Generated LaTeX:')
        console.log('─'.repeat(50))
        console.log(latex)
        console.log('─'.repeat(50))

        // Save to file
        await generator.saveToFile('./resume-output.tex')
        console.log('\n✅ Saved to resume-output.tex')
        console.log('\n🎉 All tests passed!')
    } catch (error) {
        console.error('❌ Test failed:', error)
        process.exit(1)
    }
})()
