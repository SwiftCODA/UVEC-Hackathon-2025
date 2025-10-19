"use client";
import { Check } from "lucide-react";
import { Step } from "./types";

interface ProgressIndicatorProps {
  currentStep: Step;
  completedSteps: Step[];
}

const steps: { id: Step; label: string }[] = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'additional', label: 'Additional' },
];

export const ProgressIndicator = ({ currentStep, completedSteps }: ProgressIndicatorProps) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
        
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 relative z-10
                  ${isCurrent ? 'bg-primary text-primary-foreground shadow-lg scale-110' : ''}
                  ${isCompleted && !isCurrent ? 'bg-primary text-primary-foreground' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-card border-2 border-border text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`
                text-xs font-medium transition-colors hidden sm:block
                ${isCurrent ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
