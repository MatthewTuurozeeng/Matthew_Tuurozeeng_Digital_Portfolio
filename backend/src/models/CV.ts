import mongoose, { Document, Schema } from 'mongoose';

interface IEducation {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  details?: string;
}

interface IAward {
  title: string;
  organization: string;
  date: string;
}

interface IExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface IProject {
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface IActivity {
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface ISkillCategory {
  category: string;
  skills: string;
}

interface IReference {
  abbreviation: string;
  fullForm: string;
}

export interface ICV extends Document {
  type: 'master' | 'resume';
  personalInfo: {
    name: string;
    address: string;
    phone: string;
    nationality: string;
    email: string;
    linkedin: string;
  };
  education: IEducation[];
  awards: IAward[];
  experiences: IExperience[];
  projects: IProject[];
  activities: IActivity[];
  skills: ISkillCategory[];
  references: IReference[];
  pdfUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CVSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['master', 'resume'],
      required: true,
    },
    personalInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      nationality: { type: String, required: true },
      email: { type: String, required: true },
      linkedin: { type: String, required: true },
    },
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        gpa: String,
        details: String,
      },
    ],
    awards: [
      {
        title: { type: String, required: true },
        organization: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    experiences: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        responsibilities: [String],
      },
    ],
    projects: [
      {
        organization: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        achievements: [String],
      },
    ],
    activities: [
      {
        organization: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        responsibilities: [String],
      },
    ],
    skills: [
      {
        category: { type: String, required: true },
        skills: { type: String, required: true },
      },
    ],
    references: [
      {
        abbreviation: { type: String, required: true },
        fullForm: { type: String, required: true },
      },
    ],
    pdfUrl: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICV>('CV', CVSchema);
