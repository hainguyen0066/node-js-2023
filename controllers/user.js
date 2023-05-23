import { body, validationResult } from 'express-validator';
import {
    studentRepository,
    userRepository
} from '../repositories/index.js';

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    // call repository
    await userRepository.login({ email, password });

    res.status(200).json({
        message: 'Login successful',
        data: 'details user'
    })
}

const register = async (req, res) => {
    const { email, password, name, phoneNumber, address } = req.body;

    await userRepository.register({ email, password, name, phoneNumber, address });

    res.status(201).json({
        message: 'Register successful'
    })
}

const getDetaiUser = async (req, res) => {
    res.status(201).json({
        message: 'user details successful'
    })
}

export default {
    login,
    register,
    getDetaiUser,
}