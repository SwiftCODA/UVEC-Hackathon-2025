"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "../types";

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationStep = ({ data, onChange }: EducationStepProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        degree: '',
        school: '',
        startDate: '',
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
                <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1.5"
                />
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
                <Label htmlFor={`startDate-${edu.id}`}>Start Date *</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${edu.id}`}>
                  {edu.current ? "Expected Graduation Date" : "End Date"}
                </Label>
                <Input
                  id={`endDate-${edu.id}`}
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="mt-1.5"
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
