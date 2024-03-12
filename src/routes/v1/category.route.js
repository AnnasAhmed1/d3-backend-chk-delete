const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const categoryController = require('../../controllers/category.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/').get(categoryController.getCategories).post(
	// grantAccess('createAny', resources.ROLE),
	// validate(roleValidation.createRole),
	categoryController.addCategory,
);

module.exports = router;
