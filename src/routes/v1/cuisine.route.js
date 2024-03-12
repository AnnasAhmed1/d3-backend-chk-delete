const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const cuisineController = require('../../controllers/cuisine.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/').get(cuisineController.getCuisines).post(
	// grantAccess('createAny', resources.ROLE),
	// validate(roleValidation.createRole),
	cuisineController.addCuisine,
);

module.exports = router;
