

import { Request, Response } from 'express';
import Impact from '../models/Impact';

export const getAllImpacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const impacts = await Impact.find().sort({ order: 1, createdAt: -1 });
    console.log(` Found ${impacts.length} impact initiatives`);
    res.status(200).json(impacts);
  } catch (error: any) {
    console.error('Error fetching impacts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getImpactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findById(req.params.id);

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    res.status(200).json(impact);
  } catch (error: any) {
    console.error('Error fetching impact:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Creating impact initiative with data:', req.body);

    const { title, period, description, achievements } = req.body;

    if (!title || !period || !description || !achievements) {
      console.log(' Missing required fields');
      res.status(400).json({ 
        message: 'Missing required fields',
        required: ['title', 'period', 'description', 'achievements']
      });
      return;
    }

    let achievementsArray = achievements;
    if (typeof achievements === 'string') {
      achievementsArray = achievements.split('\n')
        .map((achievement: string) => achievement.trim())
        .filter((achievement: string) => achievement.length > 0);
    }

    const impactData = {
      title,
      period,
      color: req.body.color || '#994545',
      description,
      achievements: achievementsArray,
      image: req.body.image || '',
      gallery: req.body.gallery || [],
      order: req.body.order || 0,
    };

    console.log('Sanitized impact data:', impactData);

    const impact = await Impact.create(impactData);
    
    console.log('Impact initiative created successfully:', impact._id);
    res.status(201).json(impact);
  } catch (error: any) {
    console.error(' Error creating impact:', error);
    res.status(400).json({ 
      message: 'Failed to create impact initiative', 
      error: error.message,
      details: error.errors || {}
    });
  }
};

export const updateImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Updating impact:', req.params.id);

    if (req.body.achievements && typeof req.body.achievements === 'string') {
      req.body.achievements = req.body.achievements.split('\n')
        .map((achievement: string) => achievement.trim())
        .filter((achievement: string) => achievement.length > 0);
    }

    const impact = await Impact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    console.log('Impact initiative updated successfully');
    res.status(200).json(impact);
  } catch (error: any) {
    console.error('Error updating impact:', error);
    res.status(400).json({ 
      message: 'Failed to update impact initiative', 
      error: error.message 
    });
  }
};

export const deleteImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Deleting impact:', req.params.id);
    
    const impact = await Impact.findByIdAndDelete(req.params.id);

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    console.log(' Impact initiative deleted successfully');
    res.status(200).json({ message: 'Impact initiative deleted successfully' });
  } catch (error: any) {
    console.error(' Error deleting impact:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};