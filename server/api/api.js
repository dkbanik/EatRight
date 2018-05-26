var router = require('express').Router();


//each resource directory has a resourceRoutes.js file with the router ready to go
// require them and mount them to their respective routes below

router.use('/restaurant', require('./restaurant/restaurantRoutes'));
router.use('/customer', require('./customer/customerRoutes'));



module.exports = router;