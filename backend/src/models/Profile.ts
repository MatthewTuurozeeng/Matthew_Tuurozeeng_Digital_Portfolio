

import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  profileImage?: string;
  resumeUrl?: string;
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon?: string;
  }[];
  principles?: string[];
  careerGoals?: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    skills: [
      {
        category: {
          type: String,
          required: true,
        },
        items: [String],
      },
    ],
    education: [
      {
        institution: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        field: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
        current: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],
    experience: [
      {
        company: {
          type: String,
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    socialLinks: [
      {
        platform: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        icon: String,
      },
    ],
    principles: [String],
    careerGoals: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>('Profile', profileSchema);