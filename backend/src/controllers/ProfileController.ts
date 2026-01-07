import { Request, Response } from 'express';
import Profile from '../models/Profile';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create/Update profile
// @route   POST /api/profile
// @access  Private
export const upsertProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      const updatedProfile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedProfile);
    } else {
      // Create new profile
      const newProfile = await Profile.create(req.body);
      res.status(201).json(newProfile);
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid profile data', error });
  }
};