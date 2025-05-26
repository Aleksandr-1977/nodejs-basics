import { Router } from 'express';
import studentsRouter from './students.router.js';
import authRouter from './auth.routers.js';

const router = Router();

router.use('/students', studentsRouter);
router.use('/auth', authRouter);

export default router;
