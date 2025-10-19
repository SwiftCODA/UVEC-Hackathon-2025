"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { Project } from "../types";
import { MonthYearPicker } from "../MonthYearPicker";

interface ProjectsStepProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsStep = ({ data, onChange }: ProjectsStepProps) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: '',
        startDate: '',
        endDate: '',
        current: false,
        link: '',
        description: ''
      }
    ]);
  };
  const removeProject = (id: string) => {
    onChange(data.filter(p => p.id !== id));
  };
  const updateProject = (id: string, field: keyof Project, value: string | boolean) => {
    onChange(
      data.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="form-section animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Projects</h2>
        <p className="text-muted-foreground">Showcase your relevant projects</p>
      </div>
      <div className="space-y-6">
        {data.map((p, index) => (
          <div key={p.id} className="p-6 bg-secondary/30 rounded-xl space-y-4 relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground">Project {index + 1}</h3>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(p.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${p.id}`}>Project Name *</Label>
                <Input
                  id={`name-${p.id}`}
                  value={p.name}
                  onChange={(e) => updateProject(p.id, 'name', e.target.value)}
                  placeholder="AI Resume Builder"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`link-${p.id}`}>Link</Label>
              <Input
                id={`link-${p.id}`}
                type="url"
                value={p.link || ''}
                onChange={(e) => updateProject(p.id, 'link', e.target.value)}
                placeholder="https://github.com/your/repo or project site"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <MonthYearPicker
                  value={p.startDate}
                  onChange={(val: string) => updateProject(p.id, 'startDate', val)}
                  label="Start Date *"
                />
              </div>
              <div>
                <MonthYearPicker
                  value={p.endDate}
                  onChange={(val: string) => updateProject(p.id, 'endDate', val)}
                  label="End Date"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${p.id}`}
                checked={p.current}
                onCheckedChange={(checked) => updateProject(p.id, 'current', !!checked)}
              />
              <Label htmlFor={`current-${p.id}`} className="cursor-pointer">
                I am currently working on this
              </Label>
            </div>
            <div>
              <Label htmlFor={`desc-${p.id}`}>Description</Label>
              <Textarea
                id={`desc-${p.id}`}
                value={p.description}
                onChange={(e) => updateProject(p.id, 'description', e.target.value)}
                placeholder={`• Built an AI-powered resume builder using Next.js\n• Implemented JSON export for templating\n• Improved UX with custom month/year picker`}
                className="mt-1.5 min-h-[120px]"
              />
            </div>
          </div>
        ))}
        <Button onClick={addProject} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      </div>
    </div>
  );
};
