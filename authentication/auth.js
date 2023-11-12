import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import jwt from 'jsonwebtoken';

export default function checkToken(req, res, next) {
	// by pass login and register
	if (
		req.url.toLowerCase().trim() == '/users/login' ||
		req.url.toLowerCase().trim() == '/users/register'
	) {
		next();
		return;
	}

	const token = req.headers?.authorization?.split(' ')[1];

	try {
		const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
		const isExpired = Date.now() >= jwtObject.exp * 1000;

		if (isExpired) {
			return res.status(HttpStatusCode.BAD_REQUEST).json({
				message: 'Token is expired'
			});
		} else {
			next();
			return;
		}
	} catch (error) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			message: error.message
		});
	}
}
