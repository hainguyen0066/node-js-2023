import { print, OutputType } from '../helpers/print.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import Exception from '../exceptions/Exception.js';

const login = async ({ email, password }) => {
	print(`login user in user repository ${email}`, OutputType.SUCCESS);
};

const register = async ({ email, password, name, phoneNumber, address }) => {
	const existingUser = await User.findOne({ email }).exec();
	console.log(existingUser);

	if (existingUser) {
		throw new Exception(Exception.USER_EXIST);
	}

	const hashPassword = await bcrypt.hash(
		password,
		parseInt(process.env.SALT_ROUNDS)
	);

	const newUser = await User.create({
		name,
		email,
		password: hashPassword,
		phoneNumber,
		address
	});

	return {
		...newUser._doc,
		password: 'not show'
	};
};

export default {
	login,
	register
};
