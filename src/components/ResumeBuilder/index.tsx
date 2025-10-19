'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { PreviewPanel } from './PreviewPanel'
import { ProgressIndicator } from './ProgressIndicator'
import { BasicInfoStep } from './steps/BasicInfoStep'
import { EducationStep } from './steps/EducationStep'
import { ExperienceStep } from './steps/ExperienceStep'
import { ProjectsStep } from './steps/ProjectsStep'
import { SkillsStep } from './steps/SkillsStep'
import { Education, Project, ResumeData, Step, WorkExperience } from './types'

const initialData: ResumeData = {
    basicInfo: {
        name: '',
        email: '',
        phone: '',
        country: '',
        stateProvince: '',
        city: '',
        githubUsername: '',
        linkedinUrl: ''
    },
    summary: '',
    experience: [
        {
            id: crypto.randomUUID(),
            jobTitle: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: ''
        }
    ],
    education: [
        {
            id: crypto.randomUUID(),
            credential: '',
            faculty: '',
            major: '',
            school: '',
            endDate: '',
            current: false
        }
    ],
    skills: [],
    projects: [
        {
            id: crypto.randomUUID(),
            name: '',
            startDate: '',
            endDate: '',
            current: false,
            link: '',
            description: ''
        }
    ]
}

const steps: Step[] = ['basic', 'experience', 'education', 'skills', 'projects']

export const ResumeBuilder = () => {
    const [currentStep, setCurrentStep] = useState<Step>('basic')
    const [completedSteps, setCompletedSteps] = useState<Step[]>([])
    const [resumeData, setResumeData] = useState<ResumeData>(initialData)

    const currentStepIndex = steps.indexOf(currentStep)
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === steps.length - 1

    const validateStep = (): boolean => {
        switch (currentStep) {
            case 'basic':
                if (!resumeData.basicInfo.name || !resumeData.basicInfo.email) {
                    toast.error('Please fill in all required information')
                    return false
                }
                break
            // summary removed
            case 'experience': {
                if (resumeData.experience.length === 0) break;
                const allValid = resumeData.experience.every(
                    exp => exp.jobTitle && exp.company && exp.startDate
                );
                if (!allValid) {
                    toast.error('Please fill in job title, company, and start date for all experience entries or delete incomplete ones.');
                    return false;
                }
                break;
            }
            case 'education': {
                if (resumeData.education.length === 0) break;
                const allValid = resumeData.education.every(
                    edu => edu.credential && edu.school && !!edu.endDate
                );
                if (!allValid) {
                    toast.error('Please fill in credential, school, and graduation date for all education entries or delete incomplete ones.');
                    return false;
                }
                break;
            }
            case 'skills':
                if (resumeData.skills.length === 0) {
                    toast.error('Please add at least one skill')
                    return false
                }
                break
            case 'projects': {
                if (resumeData.projects.length === 0) break;
                const allValid = resumeData.projects.every(
                    p => p.name && p.startDate
                );
                if (!allValid) {
                    toast.error('Please fill in name and start date for all project entries or delete incomplete ones.');
                    return false;
                }
                break;
            }
        }
        return true
    }

    const handleNext = () => {
        if (!validateStep()) return

        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep])
        }

        if (!isLastStep) {
            setCurrentStep(steps[currentStepIndex + 1])
        }
    }

    const handleBack = () => {
        if (!isFirstStep) {
            setCurrentStep(steps[currentStepIndex - 1])
        }
    }

    const handleGenerate = async () => {
        if (!validateStep()) return

        toast.loading('Generating your resume...')
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resumeData)
            })
            const result = await response.json()
            toast.dismiss()
            toast.success('Resume JSON ready!', {
                description: 'Your resume data was exported as JSON.'
            })
            // Download the JSON file
            const blob = new Blob([JSON.stringify(result.resume, null, 2)], {
                type: 'application/json'
            })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'resume.json'
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch {
            toast.dismiss()
            toast.error('Failed to generate resume. Please try again.')
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 'basic':
                return (
                    <BasicInfoStep
                        data={resumeData.basicInfo}
                        onChange={(data) =>
                            setResumeData({ ...resumeData, basicInfo: data })
                        }
                    />
                )
            // summary removed
            case 'experience':
                return (
                    <ExperienceStep
                        data={resumeData.experience}
                        onChange={(data: WorkExperience[]) =>
                            setResumeData({ ...resumeData, experience: data })
                        }
                    />
                )
            case 'education':
                return (
                    <EducationStep
                        data={resumeData.education}
                        onChange={(data: Education[]) =>
                            setResumeData({ ...resumeData, education: data })
                        }
                    />
                )
            case 'skills':
                return (
                    <SkillsStep
                        data={resumeData.skills}
                        onChange={(data: string[]) =>
                            setResumeData({ ...resumeData, skills: data })
                        }
                    />
                )
            case 'projects':
                return (
                    <ProjectsStep
                        data={resumeData.projects}
                        onChange={(data: Project[]) =>
                            setResumeData({ ...resumeData, projects: data })
                        }
                    />
                )
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-3">
                        AI Resume Builder
                    </h1>
                    <p className="text-muted-foreground">
                        Create a professional resume in minutes
                    </p>
                </div>

                <ProgressIndicator
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                        <div className="step-card">
                            {renderStep()}

                            <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border">
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    disabled={isFirstStep}
                                    className="min-w-[100px]"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>

                                {isLastStep ? (
                                    <Button
                                        onClick={handleGenerate}
                                        className="min-w-[150px]"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Generate Resume
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        className="min-w-[100px]"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <PreviewPanel data={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
