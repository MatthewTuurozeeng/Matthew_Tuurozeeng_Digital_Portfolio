import { Request, Response } from 'express';
import CV from '../models/CV';

// @desc    Get active CVs (both master and resume)
// @route   GET /api/cv
// @access  Public
export const getCVs = async (req: Request, res: Response): Promise<void> => {
  try {
    const cvs = await CV.find({ isActive: true });
    const masterCV = cvs.find((cv) => cv.type === 'master');
    const resume = cvs.find((cv) => cv.type === 'resume');

    res.status(200).json({
      masterCV: masterCV || null,
      resume: resume || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get CV by type
// @route   GET /api/cv/:type
// @access  Public
export const getCVByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.params;

    if (type !== 'master' && type !== 'resume') {
      res.status(400).json({ message: 'Invalid CV type' });
      return;
    }

    const cv = await CV.findOne({ type, isActive: true });

    if (!cv) {
      res.status(404).json({ message: `${type} CV not found` });
      return;
    }

    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get all CVs (for admin)
// @route   GET /api/cv/admin/all
// @access  Private
export const getAllCVs = async (req: Request, res: Response): Promise<void> => {
  try {
    const cvs = await CV.find().sort({ createdAt: -1 });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get CV by ID
// @route   GET /api/cv/admin/:id
// @access  Private
export const getCVById = async (req: Request, res: Response): Promise<void> => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      res.status(404).json({ message: 'CV not found' });
      return;
    }

    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create new CV
// @route   POST /api/cv
// @access  Private
export const createCV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.body;

    // Deactivate existing CV of same type
    await CV.updateMany({ type, isActive: true }, { isActive: false });

    const cv = await CV.create(req.body);
    res.status(201).json(cv);
  } catch (error) {
    res.status(400).json({ message: 'Invalid CV data', error });
  }
};

// @desc    Update CV
// @route   PUT /api/cv/:id
// @access  Private
export const updateCV = async (req: Request, res: Response): Promise<void> => {
  try {
    const cv = await CV.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cv) {
      res.status(404).json({ message: 'CV not found' });
      return;
    }

    // If updating to active, deactivate other CVs of same type
    if (req.body.isActive) {
      await CV.updateMany(
        { type: cv.type, _id: { $ne: cv._id }, isActive: true },
        { isActive: false }
      );
    }

    res.status(200).json(cv);
  } catch (error) {
    res.status(400).json({ message: 'Invalid CV data', error });
  }
};

// @desc    Delete CV
// @route   DELETE /api/cv/:id
// @access  Private
export const deleteCV = async (req: Request, res: Response): Promise<void> => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);

    if (!cv) {
      res.status(404).json({ message: 'CV not found' });
      return;
    }

    res.status(200).json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Toggle CV active status
// @route   PATCH /api/cv/:id/toggle
// @access  Private
export const toggleCVActive = async (req: Request, res: Response): Promise<void> => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      res.status(404).json({ message: 'CV not found' });
      return;
    }

    cv.isActive = !cv.isActive;

    // If activating, deactivate other CVs of same type
    if (cv.isActive) {
      await CV.updateMany(
        { type: cv.type, _id: { $ne: cv._id }, isActive: true },
        { isActive: false }
      );
    }

    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};