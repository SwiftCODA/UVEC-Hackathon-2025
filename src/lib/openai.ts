type Location = {
    city: string
    stateProvinceAbbreviation: string
}

export namespace OpenAIPrompts {
    export const buildInputPrompt = (
        input: {
            basicInfo: {
                name: string
                city: string
                stateProvince: string
                githubUsername?: string
                linkedinUrl?: string
                phone?: string
                email: string
            }
            education?: ({
                credential: string
                faculty: string
                major: string
                school: string
                endDate?: string
            } & Location)[]
            experience?: ({
                jobTitle: string
                company: string
                startDate: string
                endDate?: string
                responsibilities: string
            } & Location)[]
            projects?: {
                name: string
                startDate: string
                endDate?: string
                description: string
            }[]
            skills?: string[]
        } & Location
    ) => `
My name is ${input.basicInfo.name}, and I am located in ${input.city}, ${
        input.stateProvinceAbbreviation
    }.
${
    !!input.basicInfo.githubUsername
        ? `My GitHub URL is https://github.com/${input.basicInfo.githubUsername}.`
        : ''
}

${
    !!input.basicInfo.phone
        ? 'My phone number is ' + input.basicInfo.phone + '.'
        : ''
}
${
    !!input.basicInfo.linkedinUrl
        ? 'My LinkedIn URL is ' + input.basicInfo.linkedinUrl + '.'
        : ''
}
${
    !!input.basicInfo.email
        ? 'My email address is ' + input.basicInfo.email + '.'
        : ''
}

${
    !!input.education && input.education.length > 0
        ? `Here is my education background:
${JSON.stringify(input.education)}
	`
        : ''
}


${
    !!input.experience && input.experience.length > 0
        ? `Here is my work experience: ${JSON.stringify(input.experience)}`
        : ''
}

${
    !!input.projects && input.projects.length > 0
        ? `Here are my projects: ${JSON.stringify(input.projects)}`
        : ''
}

${
    !!input.skills && input.skills.length > 0
        ? `Here are my skills: ${input.skills.join(', ')}`
        : ''
}

`
}
