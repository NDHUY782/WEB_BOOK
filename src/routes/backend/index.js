const express = require('express')
const router = express.Router()


router.use((req, res, next) => {
    req.app.set('layout', 'backend/index.ejs');
    next();
});

router.use('/',require('./dashboard'))
router.use('/category',require('./category'))
router.use('/article',require('./article'))
router.use('/rss',require('./rss'))

router.use('/setting',require('./setting'))
router.use('/menu',require('./menu'))

router.use('/slider',require('./slider'))



router.use('/sendmail',require('./send_mail'))

router.use('/product',require('./product'))
// router.use('/coupon',require('./coupon'))

router.use('/category_product',require('./category_product'))

router.use('/account',require('./account'))
router.use('/group',require('./group'))
router.use('/user',require('./user'))



module.exports = router