import { body, validationResult } from 'express-validator';
import { studentRepository, userRepository } from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { EventEmitter } from 'node:events';
import Exception from '../exceptions/Exception.js';

const login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(HttpStatusCode.BAD_REQUEST).json({
			errors: errors.array()
		});
	}
	const { email, password } = req.body;
	// call repository
	await userRepository.login({ email, password });

	res.status(HttpStatusCode.OK).json({
		message: 'Login successful',
		data: 'details user'
	});
};

const myEvent = new EventEmitter();
// listen
myEvent.on('event.register.user', (params) => {
	console.log(params);
});

const register = async (req, res) => {
	const { email, password, name, phoneNumber, address } = req.body;
	myEvent.emit('event.register.user', { email, phoneNumber });

	try {
		let user = await userRepository.register({
			email,
			password,
			name,
			phoneNumber,
			address
		});

		res.status(HttpStatusCode.INSERT_OK).json({
			message: 'Register successful',
			data: user
		});
    } catch (exception) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
			message: exception.toString()
		});
	}
};

const getDetaiUser = async (req, res) => {
	res.status(HttpStatusCode.INSERT_OK).json({
		message: 'user details successful'
	});
};

export default {
	login,
	register,
	getDetaiUser
};
