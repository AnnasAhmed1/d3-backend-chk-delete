const httpStatus = require('http-status');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const { encryptData } = require('../utils/auth');
const config = require('../config/config.js');
const db = require('../db/models');
const statusService = require('./status.service');

async function getCuisineByTitle(title) {
	const cuisine = await db.cuisine.findOne({
		where: { title },
	});

	return cuisine;
}
async function createCuisine(req) {
	const { title, image, statusId } = req.body;
	const cuisine = await getCuisineByTitle(title);

	if (cuisine) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const status = await statusService.getStatusById(statusId);

	if (!status) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
	}

	const createdCuisine = await db.cuisine
		.create({
			title,

			status_id: statusId,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCuisine;
}

async function getCuisines(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const cuisines = await db.cuisine.findAndCountAll({
		order: [
			['title', 'ASC'],
			['created_date_time', 'DESC'],
			['modified_date_time', 'DESC'],
		],
		include: [
			{
				model: db.status,
				require: true,
				attributes: ['id', 'name'],
			},
		],
		attributes: ['id', 'title', 'created_date_time', 'modified_date_time'],
		offset,
		limit,
		raw: true,
	});

	return cuisines;
}

// async function deleteUserById(userId) {
// 	const deletedUser = await db.user.destroy({
// 		where: { id: userId },
// 	});

// 	if (!deletedUser) {
// 		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
// 	}

// 	return deletedUser;
// }

// async function updateUser(req) {
// 	const { password, email } = req.body;

// 	if (password) {
// 		const hashedPassword = await encryptData(password);

// 		if (!hashedPassword) {
// 			throw new ApiError(
// 				httpStatus.INTERNAL_SERVER_ERROR,
// 				'Internal Server Error',
// 			);
// 		}

// 		req.body.password = hashedPassword;
// 	}

// 	if (email) {
// 		const existedUser = await getUserByEmail(email);

// 		if (existedUser) {
// 			throw new ApiError(
// 				httpStatus.CONFLICT,
// 				'This email is already exist',
// 			);
// 		}
// 	}

// 	const updatedUser = await db.user
// 		.update(
// 			{ ...req.body },
// 			{
// 				where: { id: req.params.userId || req.body.id },
// 				returning: true,
// 				plain: true,
// 				raw: true,
// 			},
// 		)
// 		.then((data) => data[1]);

// 	return updatedUser;
// }

module.exports = {
	getCuisines,
	createCuisine,
};
