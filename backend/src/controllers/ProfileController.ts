import { Request, Response } from 'express';
import Project from '../models/Project';

// all fields allowed from request body
const ALLOWED_FIELDS = [
  'title', 'description', 'longDescription', 'technologies',
  'category', 'status', 'featured', 'published',
  'image',        // primary image URL
  'images',       // extra screenshots array
  'screenshots', 'demoVideo',
  'thumbnailImage', 'liveUrl', 'githubUrl',
  'videoUrl', 'demoUrl',
  'startDate', 'endDate',
  'challenges', 'solutions', 'impact',
  'teamSize', 'role', 'order',
];

function sanitize(body: any) {
  const data: any = {};
  for (const key of ALLOWED_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      data[key] = body[key];
    }
  }
  return data;
}

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public — only published; admin passes ?all=true
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.all !== 'true') {
      filter.published = true;
    }
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    console.log(`Found ${projects.length} projects`);
    res.status(200).json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error: any) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Creating project with data:', req.body);

    const { title, description, technologies, category } = req.body;

    if (!title || !description || !technologies || !category) {
      res.status(400).json({
        message: 'Missing required fields: title, description, technologies, category',
      });
      return;
    }

    const sanitized = sanitize(req.body);

    // ensure technologies is always an array
    if (typeof sanitized.technologies === 'string') {
      sanitized.technologies = sanitized.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    // sync: if image provided but images[] empty, push image into images
    if (sanitized.image && (!sanitized.images || sanitized.images.length === 0)) {
      sanitized.images = [sanitized.image];
    }

    console.log('Sanitized project data:', sanitized);

    const project = await Project.create(sanitized);
    console.log('Project created successfully:', project._id);
    res.status(201).json(project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ message: messages.join(', '), errors: error.errors });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Updating project:', req.params.id);

    const sanitized = sanitize(req.body);

    if (typeof sanitized.technologies === 'string') {
      sanitized.technologies = sanitized.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    if (sanitized.image && (!sanitized.images || sanitized.images.length === 0)) {
      sanitized.images = [sanitized.image];
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: sanitized },
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    console.log('Project updated successfully');
    res.status(200).json(project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Deleting project:', req.params.id);
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    console.log('Project deleted successfully');
    res.status(200).json({ message: 'Project deleted successfully', id: req.params.id });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};