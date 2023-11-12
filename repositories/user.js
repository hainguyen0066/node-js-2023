import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import Exception from '../exceptions/Exception.js';
import jwt from 'jsonwebtoken';

const login = async ({ email, password }) => {
	let existingUser = await User.findOne({ email }).exec();

	if (existingUser) {
		let isMatch = await bcrypt.compare(password, existingUser.password);

		if (isMatch) {
			// create json web token
			let token = jwt.sign(
				{
					data: existingUser
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '30 days' // 1 minues
				}
			);

			return {
				...existingUser.toObject(),
				password: 'not show',
				token: token
			}
		} else {
			throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
		}
	} else {
		throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
	}
};

const register = async ({ email, password, name, phoneNumber, address }) => {
	const existingUser = await User.findOne({ email }).exec();

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
