const httpStatus = require('http-status');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const { encryptData } = require('../utils/auth');
const config = require('../config/config.js');
const db = require('../db/models');
const statusService = require('./status.service');

async function getCategoryByTitle(title) {
	const category = await db.category.findOne({
		where: { title },
	});

	return category;
}
async function createCategory(req) {
	const { title, image, statusId } = req.body;
	const category = await getCategoryByTitle(title);

	if (category) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const status = await statusService.getStatusById(statusId);

	if (!status) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
	}

	const createdCategory = await db.category
		.create({
			title,
			image,
			status_id: statusId,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCategory;
}

async function getCategories(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const categories = await db.category.findAndCountAll({
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
		attributes: [
			'id',
			'title',
			'image',
			'created_date_time',
			'modified_date_time',
		],
		offset,
		limit,
		raw: true,
	});

	return categories;
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
	getCategories,
	createCategory,
};
