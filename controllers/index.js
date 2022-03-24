const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//if a client makes an request to an endpoint that does not exist, they will receive a 404 error.
router.use((req, res) => {
    res.status(404).end();
  });
  
  module.exports = router;