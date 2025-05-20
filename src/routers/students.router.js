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
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.validation.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/students', ctrlWrapper(getStudentsController));
router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
router.post(
  '/students',
  validateBody(createStudentSchema),
  jsonParser,
  ctrlWrapper(createStudentsController),
);
router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/students/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  jsonParser,
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  jsonParser,
  ctrlWrapper(patchStudentController),
);
export default router;
