type Location = {
    city: string
    stateProvinceAbbreviation: string
}

export namespace OpenAIPrompts {
    export const buildInputPrompt = (
        input: {
            firstName: string
            lastName: string
            city: string
            stateProvinceAbbreviation: string
            githubUsername?: string
            linkedinUrl?: string
            phoneNumber?: string
            emailAddress?: string
            education?: ({
                credential: string
                faculty: string
                major: string
                institution: string
                graduationDate?: string
            } & Location)[]
            experience?: ({
                jobTitle: string
                companyName: string
                startDate: string
                endDate?: string
                accomplishments: string
            } & Location)[]
            projects?: {
                title: string
                startDate: string
                endDate?: string
                accomplishments: string
            }[]
            skills?: string[]
        } & Location
    ) => `
My name is ${input.firstName} ${input.lastName}, and I am located in ${
        input.city
    }, ${input.stateProvinceAbbreviation}.
${
    !!input.githubUsername
        ? `My GitHub URL is https://github.com/${input.githubUsername}.`
        : ''
}

${!!input.phoneNumber ? 'My phone number is ' + input.phoneNumber + '.' : ''}
${!!input.linkedinUrl ? 'My LinkedIn URL is ' + input.linkedinUrl + '.' : ''}
${!!input.emailAddress ? 'My email address is ' + input.emailAddress + '.' : ''}

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
