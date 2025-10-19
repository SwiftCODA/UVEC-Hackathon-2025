"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { ResumeData } from "../types";

interface AdditionalStepProps {
  data: ResumeData['additional'];
  onChange: (data: ResumeData['additional']) => void;
}

export const AdditionalStep = ({ data, onChange }: AdditionalStepProps) => {
  const [certInput, setCertInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const [achievementInput, setAchievementInput] = useState('');

  const addItem = (type: 'certifications' | 'projects' | 'achievements', value: string) => {
    if (value.trim() && !data[type].includes(value.trim())) {
      onChange({
        ...data,
        [type]: [...data[type], value.trim()],
      });
      
      if (type === 'certifications') setCertInput('');
      if (type === 'projects') setProjectInput('');
      if (type === 'achievements') setAchievementInput('');
    }
  };

  const removeItem = (type: 'certifications' | 'projects' | 'achievements', value: string) => {
    onChange({
      ...data,
      [type]: data[type].filter(item => item !== value),
    });
  };

  const renderSection = (
    title: string,
    type: 'certifications' | 'projects' | 'achievements',
    inputValue: string,
    setInputValue: (value: string) => void,
    placeholder: string
  ) => (
    <div className="space-y-3">
      <Label htmlFor={`${type}-input`}>{title}</Label>
      <div className="flex gap-2">
        <Input
          id={`${type}-input`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(type, inputValue);
            }
          }}
          placeholder={placeholder}
        />
        <Button onClick={() => addItem(type, inputValue)} type="button" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {data[type].length > 0 && (
        <div className="space-y-2 mt-3">
          {data[type].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg group"
            >
              <span className="text-sm">{item}</span>
              <button
                onClick={() => removeItem(type, item)}
                className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded-full p-1 transition-all"
                type="button"
              >
                <X className="h-4 w-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="form-section animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Additional Information</h2>
        <p className="text-muted-foreground">Optional sections to enhance your resume</p>
      </div>

      <div className="space-y-6">
        {renderSection(
          'Certifications',
          'certifications',
          certInput,
          setCertInput,
          'e.g., AWS Certified Solutions Architect'
        )}

        {renderSection(
          'Projects',
          'projects',
          projectInput,
          setProjectInput,
          'e.g., E-commerce Platform with React & Node.js'
        )}

        {renderSection(
          'Achievements',
          'achievements',
          achievementInput,
          setAchievementInput,
          'e.g., Employee of the Year 2023'
        )}
      </div>
    </div>
  );
};
