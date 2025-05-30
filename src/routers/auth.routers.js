import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.validation.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),

  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));
export default router;
