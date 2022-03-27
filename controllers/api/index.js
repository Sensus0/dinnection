const router = require('express').Router();

const userRoutes = require('./user-routes');
const photosRoutes = require('./photos-routes');

router.use('/users', userRoutes);

module.exports = router;