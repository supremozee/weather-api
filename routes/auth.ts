import express from 'express';
import AuthController from '../controller/controller';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;
