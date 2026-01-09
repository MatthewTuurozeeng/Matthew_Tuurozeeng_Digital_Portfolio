import { Request, Response } from 'express';
import Impact from '../models/Impact';

export const getAllImpacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, featured, current } = req.query;
    
    const filter: any = {};
    if (type) filter.type = type;
    if (featured) filter.featured = featured === 'true';
    if (current) filter.current = current === 'true';

    const impacts = await Impact.find(filter).sort({ order: 1, startDate: -1 });
    res.json(impacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getImpactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findById(req.params.id);
    
    if (!impact) {
      res.status(404).json({ message: 'Impact not found' });
      return;
    }

    res.json(impact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = new Impact(req.body);
    await impact.save();
    res.status(201).json({ message: 'Impact created successfully', impact });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!impact) {
      res.status(404).json({ message: 'Impact not found' });
      return;
    }

    res.json({ message: 'Impact updated successfully', impact });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteImpact = async (req: Request, res: Response): Promise<void> => {
  try {
    const impact = await Impact.findByIdAndDelete(req.params.id);

    if (!impact) {
      res.status(404).json({ message: 'Impact not found' });
      return;
    }

    res.json({ message: 'Impact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};