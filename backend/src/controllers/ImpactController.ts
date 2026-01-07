import { Request, Response } from 'express';
import Impact from '../models/Impact';

// @desc    Get all impact initiatives
// @route   GET /api/impact
// @access  Public
export const getImpacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const impacts = await Impact.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get single impact initiative
// @route   GET /api/impact/:id
// @access  Public
export const getImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findById(req.params.id);

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    res.status(200).json(impact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create new impact initiative
// @route   POST /api/impact
// @access  Private
export const createImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.create(req.body);
    res.status(201).json(impact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid impact data', error });
  }
};

// @desc    Update impact initiative
// @route   PUT /api/impact/:id
// @access  Private
export const updateImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    res.status(200).json(impact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid impact data', error });
  }
};

// @desc    Delete impact initiative
// @route   DELETE /api/impact/:id
// @access  Private
export const deleteImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findByIdAndDelete(req.params.id);

    if (!impact) {
      res.status(404).json({ message: 'Impact initiative not found' });
      return;
    }

    res.status(200).json({ message: 'Impact initiative deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};