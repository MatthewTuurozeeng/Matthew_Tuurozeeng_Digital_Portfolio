import mongoose, { Document, Schema } from 'mongoose';

export interface IImpact extends Document {
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

const ImpactSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    period: {
      type: String,
      required: [true, 'Please add a period'],
    },
    color: {
      type: String,
      default: '#994545',
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    achievements: {
      type: [String],
      required: [true, 'Please add at least one achievement'],
    },
    image: String,
    gallery: [String],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IImpact>('Impact', ImpactSchema);