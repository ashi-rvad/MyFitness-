import express from 'express';
import { getAiWorkout, getAiDiet, getAiChatResponse } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);
router.use(aiRateLimiter);

router.post('/workout', getAiWorkout);
router.post('/diet', getAiDiet);
router.post('/chat', getAiChatResponse);

export default router;
