import fs from 'fs';
import { fileTypeFromFile } from 'file-type';
import { buildCheckFunction } from 'express-validator';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads' });
const checkFile = buildCheckFunction(['file'])();

export const imageUploadAndValidation = [
  // Upload image
  upload.single('image'),
  // Validate image
  checkFile.custom(async (val) => {
    if (val) {
      const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      const meta = await fileTypeFromFile(val.path);

      if (!meta || !whitelist.includes(meta.mime)) {
        throw new Error('Unaccepted file type');
      }
    }
  }),
];

export const deleteImage = (path) => {
  if (path) {
    fs.unlink(path, (err) => null);
  }
};
