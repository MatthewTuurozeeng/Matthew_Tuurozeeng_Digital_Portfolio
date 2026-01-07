import express, { Request, Response } from 'express';
import { upload } from '../middleware/Upload';
import { protect } from '../middleware/Auth';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

const router = express.Router();

// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Private
router.post(
  '/single',
  protect,
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio',
        resource_type: 'auto',
      });

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error });
    }
  }
);

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post(
  '/multiple',
  protect,
  upload.array('files', 10),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'portfolio',
          resource_type: 'auto',
        });

        // Delete local file after upload
        fs.unlinkSync(file.path);

        return {
          url: result.secure_url,
          publicId: result.public_id,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      res.status(200).json({
        success: true,
        files: uploadedFiles,
      });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error });
    }
  }
);

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
router.delete(
  '/:publicId',
  protect,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const publicId = req.params.publicId.replace(/-/g, '/');
      await cloudinary.uploader.destroy(publicId);

      res.status(200).json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Delete failed', error });
    }
  }
);

export default router;