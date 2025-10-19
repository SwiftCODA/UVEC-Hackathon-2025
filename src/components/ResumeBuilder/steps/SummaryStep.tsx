"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResumeData } from "../types";

interface SummaryStepProps {
  data: ResumeData['summary'];
  onChange: (data: string) => void;
}

export const SummaryStep = ({ data, onChange }: SummaryStepProps) => {
  return (
    <div className="form-section animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Professional Summary</h2>
        <p className="text-muted-foreground">A brief overview of your professional background and goals</p>
      </div>

      <div>
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software engineer with a passion for building scalable applications..."
          className="mt-1.5 min-h-[200px] resize-none"
          required
        />
        <p className="text-xs text-muted-foreground mt-2">
          {data.length} characters • Aim for 200-500 characters
        </p>
      </div>
    </div>
  );
};
