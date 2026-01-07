import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  screenshots?: string[];
  demoVideo?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    technologies: {
      type: [String],
      required: [true, 'Please add at least one technology'],
    },
    image: {
      type: String,
      required: [true, 'Please add a project image'],
    },
    screenshots: [String],
    demoVideo: String,
    githubUrl: String,
    liveUrl: String,
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

export default mongoose.model<IProject>('Project', ProjectSchema);