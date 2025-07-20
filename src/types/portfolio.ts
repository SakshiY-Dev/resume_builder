export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  profilePicture: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  current: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  featured: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institute: string;
  duration: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
}

export type TemplateType = 'modern' | 'classic' | 'creative';
export type ThemeType = 'light' | 'dark';

export interface AppSettings {
  currentStep: number;
  selectedTemplate: TemplateType;
  theme: ThemeType;
  previewMode: 'split' | 'full';
}