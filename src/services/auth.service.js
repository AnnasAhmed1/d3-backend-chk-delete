const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData } = require('../utils/auth');

async function loginUserWithEmailAndPassword(req, isUser = true) {
	const { email, password } = req.body;
	let user = '';
	if (isUser) {
		user = await userService.getUserByEmail(email);
	} else {
		user = await userService.getAppUserByEmail(email);
	}
	const isPasswordMatch = await decryptData(password, user.password);

	if (!user || !isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password',
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
