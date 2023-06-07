const express = require('express')

const router = express.Router();

router.get('/' , (req , res) => {
    res.render('frontend/page/contact')
})

module.exports = router;