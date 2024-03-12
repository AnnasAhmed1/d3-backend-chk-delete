const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { categoryService } = require('../services');

const getCategories = catchAsync(async (req, res) => {
	const categories = await categoryService.getCategories(req);
	res.send({ categories });
});

const addCategory = catchAsync(async (req, res) => {
	const category = await categoryService.createCategory(req);
	res.status(httpStatus.CREATED).send({ category });
});
module.exports = {
	getCategories,
	addCategory,
};
