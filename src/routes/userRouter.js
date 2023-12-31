import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMIddleware.js';
import { catchError } from '../utils/catchError.js';

export const userRouter = new express.Router();

userRouter.get('/', catchError(authMiddleware), catchError(userController.getAll));