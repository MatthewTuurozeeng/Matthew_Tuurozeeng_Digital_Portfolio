import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/ProjectController';
import { authenticateToken } from '../middleware/Auth';

const router = express.Router();

router.route('/')
  .get(getAllProjects)
  .post(authenticateToken, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(authenticateToken, updateProject)
  .delete(authenticateToken, deleteProject);

export default router;