import { ResumeGenerator } from './parseJson'

// Your sample JSON
const sampleData = {
    first_name: 'Liam',
    last_name: 'Sebestyen',
    city: 'Victoria',
    state_province_abbreviation: 'BC',
    email: 'liam@uvic.ca',
    education: [],
    github_url: 'https://github.com/swiftcoda',
    linkedin_url: '',
    phone_number: '',
    experience: [
        {
            job_title: 'Software Engineer',
            company_name: 'Cal Fire',
            location: 'California',
            start_date: '2022-01-01',
            end_date: '2023-12-31',
            accomplishments: [
                'Developed a hotspot system used by Cal Fire that improved response times across multiple incidents',
                'Engineered a 3D clustering feature for IR data enabling faster hotspot detection during firefighting operations',
                'Redesigned perimeter mapping tool to display distances between hotspots aiding firefighting planning',
                'Built a color finder tool in React and TypeScript to assist search and rescue teams in locating anomalies',
                'Created a panorama viewer for fire sites offering a 3D over 100-acre site visualisation for strategic assessment',
                'Set up Docker, AWS, and Nginx pipelines to automate deployment processes ensuring rapid updates',
                'Collaborated with UI designers and optimized system performance for approximately 10,000 users',
                'Engaged with fire teams and engineers to identify essential tools tailored to operational needs'
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
