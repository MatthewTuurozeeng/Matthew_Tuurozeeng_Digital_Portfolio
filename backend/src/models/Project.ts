import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  id?: string; //for frontend mapping
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai-ml' | 'data-science' | 'other';
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
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    technologies: { type: [String], required: true },
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
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] }, // array of URLs
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
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // include virtuals in JSON output
      transform: function (doc, ret) {
        // type assertion to avoid TypeScript 'delete' operand errors
        if (ret && (ret as any)._id) {
          ret.id = (ret as any)._id.toString(); 
        }
        delete (ret as any)._id; 
        delete (ret as any).__v;
      },
    },
  }
);

// index for sorting
projectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model<IProject>('Project', projectSchema);
