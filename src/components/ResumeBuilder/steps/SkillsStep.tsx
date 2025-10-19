"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface SkillsStepProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsStep = ({ data, onChange }: SkillsStepProps) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    if (inputValue.trim() && !data.includes(inputValue.trim())) {
      onChange([...data, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter(s => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="form-section animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your technical and professional skills</p>
      </div>

      <div>
        <Label htmlFor="skill-input">Add Skills</Label>
        <div className="flex gap-2 mt-1.5">
          <Input
            id="skill-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Project Management"
          />
          <Button onClick={addSkill} type="button">
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter or click Add to add a skill
        </p>
      </div>

      {data.length > 0 && (
        <div>
          <Label>Your Skills ({data.length})</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {data.map((skill) => (
              <div
                key={skill}
                className="tag-input group"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-destructive/10 rounded-full p-0.5 transition-colors"
                  type="button"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No skills added yet. Start adding your skills above!</p>
        </div>
      )}
    </div>
  );
};
