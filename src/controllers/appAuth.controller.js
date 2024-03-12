const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
	authService,
	userService,
	emailService,
	tokenService,
} = require('../services');
const { verifyToken } = require('../utils/auth');

const appRegister = catchAsync(async (req, res) => {
	const user = await userService.createAppUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const user = await authService.loginUserWithEmailAndPassword(req, false);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email,
	);
	await emailService.sendResetPasswordEmail(
		req.body.email,
		resetPasswordToken,
	);
	res.send({ success: true });
});

const resetPassword = catchAsync(async (req, res) => {
	const { id } = await verifyToken(req.query.token);
	req.body.id = id;
	await userService.updateUser(req);
	res.send({ success: true });
});

module.exports = {
	appRegister,
	login,
	forgotPassword,
	resetPassword,
};
