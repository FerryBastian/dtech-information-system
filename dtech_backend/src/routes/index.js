const express = require('express');

const achievementRoutes = require('./achievement.route');
const certificateRoutes = require('./certificate.route');
const exampleRoutes = require('./example.routes');

const router = express.Router();

router.use('/', achievementRoutes);
router.use('/', certificateRoutes);
router.use('/example', exampleRoutes);

module.exports = router;
