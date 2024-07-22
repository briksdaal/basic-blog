import { bucket } from '../../config/mongoose.js';
import { uploads_get } from '../uploadsController.js';
import { createReadStream } from 'fs';

export function addImageToGridFS(file) {
  return new Promise((res, rej) => {
    try {
      const uploadStream = bucket.openUploadStream(file.filename, {
        chunkSizeBytes: 1048576,
      });

      createReadStream(file.path).pipe(uploadStream);

      uploadStream.on('finish', () => {
        res(uploadStream);
      });

      uploadStream.on('error', (err) => {
        rej(err);
      });
    } catch (err) {
      rej(err);
    }
  });
}

export function removeImageFromGridFS(id) {
  if (id) return bucket.delete(id);
}
