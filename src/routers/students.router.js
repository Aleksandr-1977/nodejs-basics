import { Router } from 'express';
import express from 'express';
import {
  createStudentsController,
  getStudentByIdController,
  getStudentsController,
} from '../controllers/students.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/students', ctrlWrapper(getStudentsController));
router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));
router.post('/students', jsonParser, ctrlWrapper(createStudentsController));

export default router;
