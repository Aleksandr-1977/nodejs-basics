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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});
router.use(authenticate);
router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));
router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  jsonParser,

  validateBody(createStudentSchema),
  ctrlWrapper(createStudentsController),
);
router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  jsonParser,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'),
  jsonParser,

  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
