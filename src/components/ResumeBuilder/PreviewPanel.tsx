'use client'
import {
    Briefcase,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    MapPin,
    Phone
} from 'lucide-react'
import { ResumeData } from './types'

interface PreviewPanelProps {
    data: ResumeData
}

export const PreviewPanel = ({ data }: PreviewPanelProps) => {
    return (
        <div className="preview-card animate-slide-in">
            <div className="mb-4 pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    Information Preview
                </h3>
                <p className="text-xs text-muted-foreground">
                    Make sure your information is correct before we make your
                    resume.
                </p>
            </div>

            <div className="space-y-6">
                {data.basicInfo.name && (
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                            {data.basicInfo.name}
                        </h2>
                        <div className="space-y-1.5 text-sm text-muted-foreground">
                            {data.basicInfo.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>{data.basicInfo.email}</span>
                                </div>
                            )}
                            {data.basicInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{data.basicInfo.phone}</span>
                                </div>
                            )}
                            {(data.basicInfo.city ||
                                data.basicInfo.stateProvince ||
                                data.basicInfo.country) && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>
                                        {[
                                            data.basicInfo.city,
                                            data.basicInfo.stateProvince,
                                            data.basicInfo.country
                                        ]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </span>
                                </div>
                            )}
                            {data.basicInfo.githubUsername && (
                                <a
                                    className="flex items-center gap-2 hover:underline"
                                    href={data.basicInfo.githubUsername}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-3.5 w-3.5" />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {data.basicInfo.linkedinUrl && (
                                <a
                                    className="flex items-center gap-2 hover:underline"
                                    href={data.basicInfo.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="h-3.5 w-3.5" />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Summary section removed */}

                {data.experience.some((exp) => exp.jobTitle || exp.company) && (
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Experience
                        </h3>
                        <div className="space-y-3">
                            {data.experience
                                .filter((exp) => exp.jobTitle || exp.company)
                                .map((exp) => (
                                    <div key={exp.id} className="text-xs">
                                        {exp.jobTitle && (
                                            <div className="font-medium text-foreground">
                                                {exp.jobTitle}
                                            </div>
                                        )}
                                        {exp.company && (
                                            <div className="text-muted-foreground">
                                                {exp.company}
                                            </div>
                                        )}
                                        {(exp.startDate ||
                                            exp.endDate ||
                                            exp.current) && (
                                            <div className="text-muted-foreground mt-1">
                                                {exp.startDate} -{' '}
                                                {exp.current
                                                    ? 'Present'
                                                    : exp.endDate}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {data.education.some(
                    (edu) =>
                        edu.credential || edu.school || edu.major || edu.faculty
                ) && (
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Education
                        </h3>
                        <div className="space-y-3">
                            {data.education
                                .filter(
                                    (edu) =>
                                        edu.credential ||
                                        edu.school ||
                                        edu.major ||
                                        edu.faculty
                                )
                                .map((edu) => (
                                    <div key={edu.id} className="text-xs">
                                        {(edu.credential || edu.major) && (
                                            <div className="font-medium text-foreground">
                                                {[edu.credential, edu.major]
                                                    .filter(Boolean)
                                                    .join(' • ')}
                                            </div>
                                        )}
                                        {edu.school && (
                                            <div className="text-muted-foreground">
                                                {edu.school}
                                            </div>
                                        )}
                                        {edu.faculty && (
                                            <div className="text-muted-foreground">
                                                {edu.faculty}
                                            </div>
                                        )}
                                        {edu.endDate && (
                                            <div className="text-muted-foreground mt-1">
                                                {edu.current
                                                    ? 'Expected: '
                                                    : ''}
                                                {edu.endDate}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 bg-accent/50 text-accent-foreground rounded text-xs"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {data.projects &&
                    data.projects.some((p) => p.name || p.description) && (
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">
                                Projects
                            </h3>
                            <div className="space-y-3">
                                {data.projects
                                    .filter((p) => p.name || p.description)
                                    .map((p) => (
                                        <div key={p.id} className="text-xs">
                                            {p.name && (
                                                <div className="font-medium text-foreground">
                                                    {p.name}
                                                </div>
                                            )}
                                            {(p.startDate ||
                                                p.endDate ||
                                                p.current) && (
                                                <div className="text-muted-foreground">
                                                    {[
                                                        p.startDate ||
                                                        p.endDate ||
                                                        p.current
                                                            ? `${
                                                                  p.startDate
                                                              } - ${
                                                                  p.current
                                                                      ? 'Present'
                                                                      : p.endDate
                                                              }`
                                                            : ''
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' • ')}
                                                </div>
                                            )}
                                            {p.description && (
                                                <div className="text-muted-foreground whitespace-pre-wrap mt-1">
                                                    {p.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
