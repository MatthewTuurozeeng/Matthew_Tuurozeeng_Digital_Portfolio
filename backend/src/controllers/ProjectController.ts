// import { Request, Response } from 'express';
// import Project from '../models/Project';

// export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { category, status, featured } = req.query;
    
//     const filter: any = {};
//     if (category) filter.category = category;
//     if (status) filter.status = status;
//     if (featured) filter.featured = featured === 'true';

//     const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getProjectById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const project = await Project.findById(req.params.id);
    
//     if (!project) {
//       res.status(404).json({ message: 'Project not found' });
//       return;
//     }

//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).json({ message: 'Project created successfully', project });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const project = await Project.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!project) {
//       res.status(404).json({ message: 'Project not found' });
//       return;
//     }

//     res.json({ message: 'Project updated successfully', project });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const project = await Project.findByIdAndDelete(req.params.id);

//     if (!project) {
//       res.status(404).json({ message: 'Project not found' });
//       return;
//     }

//     res.json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


import { Request, Response } from 'express';
import Project from '../models/Project';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    console.log(` Found ${projects.length} projects`);
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

    // Validate required fields
    const { title, description, technologies, image } = req.body;

    if (!title || !description || !technologies || !image) {
      console.log('Missing required fields');
      res.status(400).json({ 
        message: 'Missing required fields',
        required: ['title', 'description', 'technologies', 'image']
      });
      return;
    }

    // Ensure technologies is an array
    let techArray = technologies;
    if (typeof technologies === 'string') {
      techArray = technologies.split(',').map((tech: string) => tech.trim());
    }

    // Create project with validated data
    const projectData = {
      title,
      description,
      technologies: techArray,
      image,
      screenshots: req.body.screenshots || [],
      demoVideo: req.body.demoVideo || '',
      githubUrl: req.body.githubUrl || '',
      liveUrl: req.body.liveUrl || '',
      featured: req.body.featured || false,
      order: req.body.order || 0,
    };

    console.log(' Sanitized project data:', projectData);

    const project = await Project.create(projectData);
    
    console.log(' Project created successfully:', project._id);
    res.status(201).json(project);
  } catch (error: any) {
    console.error(' Error creating project:', error);
    res.status(400).json({ 
      message: 'Failed to create project', 
      error: error.message,
      details: error.errors || {}
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(' Updating project:', req.params.id);
    console.log(' Update data:', req.body);

    // Ensure technologies is an array if it's a string
    if (req.body.technologies && typeof req.body.technologies === 'string') {
      req.body.technologies = req.body.technologies.split(',').map((tech: string) => tech.trim());
    }

    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      console.log('Project not found');
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    console.log('Project updated successfully');
    res.status(200).json(project);
  } catch (error: any) {
    console.error(' Error updating project:', error);
    res.status(400).json({ 
      message: 'Failed to update project', 
      error: error.message 
    });
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
      console.log('Project not found');
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    console.log('Project deleted successfully');
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};