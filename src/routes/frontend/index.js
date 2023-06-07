const express = require('express')
const router = express.Router();
const Middleware_menu = require('../../middleware/data_load')

const auth = require('../../middleware/auth')

router.use((req, res, next) => {
    req.app.set('layout', 'frontend/index.ejs');
    next();
});

router.use('/auth',require('./auth'))
router.use('/' ,Middleware_menu, require('./home'))
router.use('/contact' , require('./contact'))
router.use('/blog' , require('./blog'))

router.use('/blog_detail' , require('./blog_detail'))

router.use('/product' , require('./product'))

// router.use('/product_detail' , require('./product_detail'))

router.use('/login' , require('./login'))
router.use('/register',require('./user'))
router.use('/verify',require('./verify'))
router.use('/forget',require('./forget'))
router.use('/forget-password',require('./forget-password'))

router.use('/home',require('./user_home'))




module.exports = router;