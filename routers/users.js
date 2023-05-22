import express from 'express';
const router = express.Router();
import {body, validationResult} from 'express-validator';
import {
    userController,
    studentController,
} from '../controllers/index.js';

router.get('/:id', userController.getDetaiUser)

router.post('/login',
    // validator
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
    userController.login
)

router.post('/register', userController.register)

export default router;