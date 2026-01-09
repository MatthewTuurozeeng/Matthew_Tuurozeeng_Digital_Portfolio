import mongoose, { Document, Schema } from 'mongoose';

export interface IImpact extends Document {
  title: string;
  organization: string;
  type: 'fellowship' | 'leadership' | 'volunteer' | 'mentorship' | 'award' | 'other';
  description: string;
  longDescription?: string;
  role?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location?: string;
  images: string[];
  thumbnailImage?: string;
  websiteUrl?: string;
  achievements: string[];
  impact?: string;
  skills: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const impactSchema = new Schema<IImpact>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['fellowship', 'leadership', 'volunteer', 'mentorship', 'award', 'other'],
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: String,
    role: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    current: {
      type: Boolean,
      default: false,
    },
    location: String,
    images: [String],
    thumbnailImage: String,
    websiteUrl: String,
    achievements: [String],
    impact: String,
    skills: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting
impactSchema.index({ order: 1, startDate: -1 });

export default mongoose.model<IImpact>('Impact', impactSchema);