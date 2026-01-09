import { Request, Response } from 'express';
import Profile from '../models/Profile';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get the first (and should be only) profile
    const profile = await Profile.findOne();
    
    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrUpdateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if profile exists
    let profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json({ message: 'Profile updated successfully', profile });
    } else {
      // Create new profile
      profile = new Profile(req.body);
      await profile.save();
      res.status(201).json({ message: 'Profile created successfully', profile });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    await Profile.findByIdAndDelete(profile._id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};