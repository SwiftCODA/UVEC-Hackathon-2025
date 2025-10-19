export interface ResumeData {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    country: 'USA' | 'Canada' | '';
    stateProvince: string;
    city: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
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
  credential: string; // e.g., Bachelor's, Diploma, Certificate
  faculty: string;    // e.g., Engineering, Arts
  major: string;      // e.g., Computer Science
  school: string;
  endDate: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  organization: string; // optional display org/company/school
  startDate: string;
  endDate: string;
  current: boolean;
  link?: string;
  description: string;
}

export type Step =
  | 'basic'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects';
