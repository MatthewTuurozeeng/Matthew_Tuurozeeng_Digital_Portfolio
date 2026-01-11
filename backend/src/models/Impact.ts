import mongoose, { Document, Schema } from 'mongoose';

export interface Impact extends Document {
  title: string;
  period: string;
  color: string;
  description: string;
  achievements: string[];
  image?: string;
  gallery?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const impactSchema = new Schema<Impact>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      default: '#994545',
    },
    description: {
      type: String,
      required: true,
    },
    achievements: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
    },
    gallery: {
      type: [String],
      default: [],
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

impactSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model<Impact>('Impact', impactSchema);
