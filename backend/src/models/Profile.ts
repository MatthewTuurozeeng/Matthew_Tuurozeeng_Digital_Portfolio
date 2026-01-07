import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  heroBackground?: string;
  email: string;
  phone?: string;
  location?: string;
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
  };
  careerGoals: string;
  principles: Array<{
    title: string;
    description: string;
  }>;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  cvUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Please add your professional title'],
    },
    bio: {
      type: String,
      required: [true, 'Please add your bio'],
    },
    profileImage: {
      type: String,
      required: [true, 'Please add a profile image'],
    },
    heroBackground: String,
    email: {
      type: String,
      required: [true, 'Please add your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: String,
    location: String,
    skills: {
      frontend: [String],
      backend: [String],
      databases: [String],
      tools: [String],
    },
    careerGoals: String,
    principles: [
      {
        title: String,
        description: String,
      },
    ],
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      website: String,
    },
    cvUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);