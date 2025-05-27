import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.validation.js';
import { registerUserController } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.post(
  '/register',
  validateBody(registerUserSchema),
  jsonParser,
  ctrlWrapper(registerUserController),
);

export default router;
