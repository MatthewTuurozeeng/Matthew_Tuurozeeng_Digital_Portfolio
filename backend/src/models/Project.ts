import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;           // removed enum restriction — accept any string
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  published: boolean;         // NEW: publish/unpublish toggle
  image: string;              // NEW: primary image (single URL from Cloudinary)
  images: string[];           // keep for backward compat / screenshots
  thumbnailImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  screenshots?: string[];
  demoVideo?: string;
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
      trim: true,
      // No enum — accept any string the admin provides (Web, Mobile, etc.)
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },   // NEW
    image: { type: String, default: '' },            // NEW: primary image URL
    images: { type: [String], default: [] },
    screenshots: { type: [String], default: [] },
    demoVideo: { type: String, default: '' },
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
      virtuals: true,
      transform: function (_doc, ret) {
        if (ret && (ret as any)._id) {
          ret.id = (ret as any)._id.toString();
        }
        delete (ret as any)._id;
        delete (ret as any).__v;
      },
    },
  }
);

projectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model<IProject>('Project', projectSchema);
