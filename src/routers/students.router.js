import { Router } from 'express';
import express from 'express';
import {
  createStudentsController,
  getStudentByIdController,
  getStudentsController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
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
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));
router.put(
  '/students/:studentId',
  jsonParser,
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/students/:studentId',
  jsonParser,
  ctrlWrapper(patchStudentController),
);
export default router;
