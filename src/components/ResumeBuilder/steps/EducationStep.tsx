"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "../types";
import { MonthYearPicker } from "../MonthYearPicker";

const CREDENTIAL_OPTIONS = [
  "Bachelor's",
  "Master's",
  "Doctorate (PhD)",
  "Associate's",
  "Diploma",
  "Certificate",
  "High School Diploma",
];

const FACULTY_OPTIONS = [
  "Engineering",
  "Arts",
  "Science",
  "Business",
  "Education",
  "Health Sciences",
  "Law",
  "Medicine",
  "Social Sciences",
  "Computing & IT",
];

const MAJOR_OPTIONS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Data Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Finance",
  "Marketing",
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
];

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationStep = ({ data, onChange }: EducationStepProps) => {
  const [showCustom, setShowCustom] = useState<{
    credential: Record<string, boolean>;
    faculty: Record<string, boolean>;
    major: Record<string, boolean>;
  }>({ credential: {}, faculty: {}, major: {} });

  const toggleCustom = (field: 'credential' | 'faculty' | 'major', id: string, show: boolean) => {
    setShowCustom(prev => ({ ...prev, [field]: { ...prev[field], [id]: show } }));
  };

  const addEducation = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        credential: '',
        faculty: '',
        major: '',
        school: '',
        endDate: '',
        current: false,
      },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onChange(
      data.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="form-section animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Education</h2>
        <p className="text-muted-foreground">Add your educational background</p>
      </div>

      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="p-6 bg-secondary/30 rounded-xl space-y-4 relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground">Education {index + 1}</h3>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`credential-${edu.id}`}>Credential *</Label>
                <select
                  id={`credential-${edu.id}`}
                  className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={showCustom.credential[edu.id] ? "_other" : (CREDENTIAL_OPTIONS.includes(edu.credential) ? edu.credential : "")}
                  onChange={(e) => {
                    if (e.target.value === "_other") {
                      toggleCustom('credential', edu.id, true);
                      updateEducation(edu.id, 'credential', '');
                    } else {
                      toggleCustom('credential', edu.id, false);
                      updateEducation(edu.id, 'credential', e.target.value);
                    }
                  }}
                >
                  <option value="">Select credential</option>
                  {CREDENTIAL_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  <option value="_other">Other</option>
                </select>
                {(showCustom.credential[edu.id] || (!!edu.credential && !CREDENTIAL_OPTIONS.includes(edu.credential))) && (
                  <Input
                    className="mt-2"
                    placeholder="Type your credential"
                    value={edu.credential}
                    onChange={(e) => updateEducation(edu.id, 'credential', e.target.value)}
                  />
                )}
              </div>

              <div>
                <Label htmlFor={`school-${edu.id}`}>School *</Label>
                <Input
                  id={`school-${edu.id}`}
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="University of Technology"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`faculty-${edu.id}`}>Faculty</Label>
                <select
                  id={`faculty-${edu.id}`}
                  className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={showCustom.faculty[edu.id] ? "_other" : (FACULTY_OPTIONS.includes(edu.faculty) ? edu.faculty : "")}
                  onChange={(e) => {
                    if (e.target.value === "_other") {
                      toggleCustom('faculty', edu.id, true);
                      updateEducation(edu.id, 'faculty', '');
                    } else {
                      toggleCustom('faculty', edu.id, false);
                      updateEducation(edu.id, 'faculty', e.target.value);
                    }
                  }}
                >
                  <option value="">Select faculty</option>
                  {FACULTY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  <option value="_other">Other</option>
                </select>
                {(showCustom.faculty[edu.id] || (!!edu.faculty && !FACULTY_OPTIONS.includes(edu.faculty))) && (
                  <Input
                    className="mt-2"
                    placeholder="Type your faculty"
                    value={edu.faculty}
                    onChange={(e) => updateEducation(edu.id, 'faculty', e.target.value)}
                  />
                )}
              </div>
              <div>
                <Label htmlFor={`major-${edu.id}`}>Major</Label>
                <select
                  id={`major-${edu.id}`}
                  className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={showCustom.major[edu.id] ? "_other" : (MAJOR_OPTIONS.includes(edu.major) ? edu.major : "")}
                  onChange={(e) => {
                    if (e.target.value === "_other") {
                      toggleCustom('major', edu.id, true);
                      updateEducation(edu.id, 'major', '');
                    } else {
                      toggleCustom('major', edu.id, false);
                      updateEducation(edu.id, 'major', e.target.value);
                    }
                  }}
                >
                  <option value="">Select major</option>
                  {MAJOR_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  <option value="_other">Other</option>
                </select>
                {(showCustom.major[edu.id] || (!!edu.major && !MAJOR_OPTIONS.includes(edu.major))) && (
                  <Input
                    className="mt-2"
                    placeholder="Type your major"
                    value={edu.major}
                    onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <MonthYearPicker
                  value={edu.endDate}
                  onChange={(val: string) => updateEducation(edu.id, 'endDate', val)}
                  label={edu.current ? "Expected Graduation Date *" : "Graduation Date *"}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${edu.id}`}
                checked={edu.current}
                onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked)}
              />
              <Label htmlFor={`current-${edu.id}`} className="cursor-pointer">
                Currently studying here
              </Label>
            </div>
          </div>
        ))}

        <Button
          onClick={addEducation}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      </div>
    </div>
  );
};
