"use client";
import { ResumeData } from "./types";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface PreviewPanelProps {
  data: ResumeData;
}

export const PreviewPanel = ({ data }: PreviewPanelProps) => {
  return (
    <div className="preview-card animate-slide-in">
      <div className="mb-4 pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">Resume Preview</h3>
        <p className="text-xs text-muted-foreground">See your resume come to life</p>
      </div>

      <div className="space-y-6">
        {data.basicInfo.name && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{data.basicInfo.name}</h2>
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
              {data.basicInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{data.basicInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {data.summary && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience.some(exp => exp.jobTitle || exp.company) && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Experience
            </h3>
            <div className="space-y-3">
              {data.experience
                .filter(exp => exp.jobTitle || exp.company)
                .map(exp => (
                  <div key={exp.id} className="text-xs">
                    {exp.jobTitle && (
                      <div className="font-medium text-foreground">{exp.jobTitle}</div>
                    )}
                    {exp.company && (
                      <div className="text-muted-foreground">{exp.company}</div>
                    )}
                    {(exp.startDate || exp.endDate || exp.current) && (
                      <div className="text-muted-foreground mt-1">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {data.education.some(edu => edu.degree || edu.school) && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </h3>
            <div className="space-y-3">
              {data.education
                .filter(edu => edu.degree || edu.school)
                .map(edu => (
                  <div key={edu.id} className="text-xs">
                    {edu.degree && (
                      <div className="font-medium text-foreground">{edu.degree}</div>
                    )}
                    {edu.school && (
                      <div className="text-muted-foreground">{edu.school}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map(skill => (
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
      </div>
    </div>
  );
};
