const express = require('express')

const router = express.Router()
const notify  		= require(`${__path_configs}notify`)
const auth_controller = require(`${__path_controllers}auth_controller`)
const { validate } = require(`${__path_validator}item`);




router
    .route('/login')
    .get(auth_controller.getLogin)

router
    .route('/login')
    .post(auth_controller.verifyLogin)
    
module.exports = router;





