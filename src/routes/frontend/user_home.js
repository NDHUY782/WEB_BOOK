
const express = require('express')
const router = express.Router()
const session = require('express-session')
const config = require('../../configs/config')



const UserController = require(`${__path_controllers}/user_controller`)


const auth = require('../../middleware/auth')

router.use(session({secret:config.sessionSerect}))


router
    .route('/')
    .get(UserController.loadHome)

// router
//     .route('/')
//     .get(auth.isLogout,UserController.loginLoad)

// router
//     .route('/login')
//     .get(auth.isLogout,UserController.loginLoad)

// router
//     .route('/login')
//     .post(UserController.verifyLogin)


// router
//     .route('/home')
//     .get(auth.isLogin,UserController.loadHome)

// router
//     .route('/logout')
//     .get(UserController.userLogout)


    

module.exports = router;