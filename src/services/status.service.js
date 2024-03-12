const httpStatus = require('http-status');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config.js');
const db = require('../db/models');

async function getStatusById(statusId) {
	const status = await db.status.findOne({
		where: { id: statusId },
	});

	return status;
}

module.exports = {
	getStatusById,
};
