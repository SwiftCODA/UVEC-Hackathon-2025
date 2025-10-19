export interface ResumeData {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  additional: {
    certifications: string[];
    projects: string[];
    achievements: string[];
  };
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export type Step =
  | 'basic'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'additional';
