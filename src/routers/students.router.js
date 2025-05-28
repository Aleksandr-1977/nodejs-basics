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

router.get('/', ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));
router.post(
  '/students',
  jsonParser,
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentsController),
);
router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));
router.put(
  '/:studentId',
  isValidId,
  jsonParser,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  isValidId,
  jsonParser,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);
export default router;
