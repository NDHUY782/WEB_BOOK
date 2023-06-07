
const express = require('express')
const router = express.Router()
const session = require('express-session')
const config = require('../../configs/config')



const UserController = require(`${__path_controllers}/user_controller`)


const auth = require('../../middleware/auth')

router.use(session({secret:config.sessionSerect}))

router
    .route('/')
    .get(auth.isLogout,UserController.forgetLoad)
router
    .route('/')
    .post(auth.isLogout,UserController.forgetVerify)






    

module.exports = router;