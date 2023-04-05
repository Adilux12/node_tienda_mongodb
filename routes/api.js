const { checkToken } = require('../helpers/middleware');

const router = require('express').Router();

router.use('/products', checkToken, require('./api/products'));

router.use('/user', require('./api/user'))


module.exports = router;