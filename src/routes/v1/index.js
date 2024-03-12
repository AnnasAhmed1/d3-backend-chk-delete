const express = require('express');
const authRoute = require('./auth.route');
const appAuthRoute = require('./app.auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const cuisineRoute = require('./cuisine.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', authRoute); // just created this to us jwt, will user /user/register to add users from cms
router.use('/appauth', appAuthRoute);
router.use('/category', categoryRoute);
router.use('/cuisine', cuisineRoute);
router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/docs', docsRoute);

module.exports = router;
