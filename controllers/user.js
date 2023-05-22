import {body, validationResult} from 'express-validator';

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    res.send('Post Login');
}

const register = async (req, res) => {
    res.send('register User');
}

const getDetaiUser = async (req, res) => {
    res.send('register User')
}

export default {
    login,
    register,
    getDetaiUser,
}