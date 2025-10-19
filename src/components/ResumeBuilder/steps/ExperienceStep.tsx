'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { MonthYearPicker } from '../MonthYearPicker'
import { WorkExperience } from '../types'

interface ExperienceStepProps {
    data: WorkExperience[]
    onChange: (data: WorkExperience[]) => void
}

export const ExperienceStep = ({ data, onChange }: ExperienceStepProps) => {
    const addExperience = () => {
        onChange([
            ...data,
            {
                id: crypto.randomUUID(),
                jobTitle: '',
                company: '',
                startDate: '',
                endDate: '',
                current: false,
                responsibilities: ''
            }
        ])
    }

    const removeExperience = (id: string) => {
        onChange(data.filter((exp) => exp.id !== id))
    }

    const updateExperience = (
        id: string,
        field: keyof WorkExperience,
        value: string | boolean
    ) => {
        onChange(
            data.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        )
    }

    return (
        <div className="form-section animate-fade-in">
            <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Work Experience
                </h2>
                <p className="text-muted-foreground">
                    Add your relevant work history
                </p>
            </div>

            <div className="space-y-6">
                {data.map((exp, index) => (
                    <div
                        key={exp.id}
                        className="p-6 bg-secondary/30 rounded-xl space-y-4 relative"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">
                                Position {index + 1}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`jobTitle-${exp.id}`}>
                                    Job Title *
                                </Label>
                                <Input
                                    id={`jobTitle-${exp.id}`}
                                    value={exp.jobTitle}
                                    onChange={(e) =>
                                        updateExperience(
                                            exp.id,
                                            'jobTitle',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Software Engineer"
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <Label htmlFor={`company-${exp.id}`}>
                                    Company *
                                </Label>
                                <Input
                                    id={`company-${exp.id}`}
                                    value={exp.company}
                                    onChange={(e) =>
                                        updateExperience(
                                            exp.id,
                                            'company',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Tech Corp"
                                    className="mt-1.5"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <MonthYearPicker
                                    value={exp.startDate}
                                    onChange={(val: string) =>
                                        updateExperience(
                                            exp.id,
                                            'startDate',
                                            val
                                        )
                                    }
                                    label="Start Date *"
                                />
                            </div>
                            <div>
                                <MonthYearPicker
                                    value={exp.endDate}
                                    onChange={(val: string) =>
                                        updateExperience(exp.id, 'endDate', val)
                                    }
                                    label="End Date"
                                    disabled={!!exp.current}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onCheckedChange={(checked) =>
                                    updateExperience(exp.id, 'current', checked)
                                }
                            />
                            <Label
                                htmlFor={`current-${exp.id}`}
                                className="cursor-pointer"
                            >
                                I currently work here
                            </Label>
                        </div>

                        <div>
                            <Label htmlFor={`responsibilities-${exp.id}`}>
                                Responsibilities
                            </Label>
                            <Textarea
                                id={`responsibilities-${exp.id}`}
                                value={exp.responsibilities}
                                onChange={(e) =>
                                    updateExperience(
                                        exp.id,
                                        'responsibilities',
                                        e.target.value
                                    )
                                }
                                placeholder={`• Led development of new features\n• Collaborated with cross-functional teams\n• Improved performance by 30%`}
                                className="mt-1.5 min-h-[120px]"
                            />
                        </div>
                    </div>
                ))}

                <Button
                    onClick={addExperience}
                    variant="outline"
                    className="w-full"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Position
                </Button>
            </div>
        </div>
    )
}
