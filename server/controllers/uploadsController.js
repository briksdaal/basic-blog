import asyncHandler from 'express-async-handler';
import { bucket } from '../config/mongoose.js';
import mongoose from 'mongoose';
import createError from 'http-errors';

export const uploads_get = asyncHandler(async function (req, res, next) {
  try {
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id)
    );

    downloadStream.on('error', () => {
      next(createError(404));
    });

    downloadStream.pipe(res);
  } catch (e) {
    next(createError(404));
  }
});
