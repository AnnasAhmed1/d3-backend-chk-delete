const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { cuisineService } = require('../services');

const getCuisines = catchAsync(async (req, res) => {
	const cuisines = await cuisineService.getCuisines(req);
	res.send({ cuisines });
});

const addCuisine = catchAsync(async (req, res) => {
	const cuisine = await cuisineService.createCuisine(req);
	res.status(httpStatus.CREATED).send({ cuisine });
});
module.exports = {
	getCuisines,
	addCuisine,
};
