import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  images: string[];
  thumbnailImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  startDate?: Date;
  endDate?: Date;
  challenges?: string;
  solutions?: string;
  impact?: string;
  teamSize?: number;
  role?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    technologies: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'desktop', 'ai-ml', 'data-science', 'other'],
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: [String],
    thumbnailImage: String,
    liveUrl: String,
    githubUrl: String,
    videoUrl: String,
    demoUrl: String,
    startDate: Date,
    endDate: Date,
    challenges: String,
    solutions: String,
    impact: String,
    teamSize: Number,
    role: String,
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
projectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model<IProject>('Project', projectSchema);