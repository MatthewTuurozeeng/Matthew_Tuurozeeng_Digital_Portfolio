import express, { Request, Response } from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/Auth';
import cloudinary from '../config/cloudinary';
import { PassThrough } from 'stream';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // memory storage

router.post(
  '/single',
  authenticateToken,
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      // Upload to Cloudinary
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio', resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        const bufferStream = new PassThrough();
        const file = req.file!; // non-null due to the earlier check
        bufferStream.end(file.buffer);
        bufferStream.pipe(stream);
      });

      res.status(200).json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Upload failed', error: (error as Error).message });
    }
  }
);


export default router;
