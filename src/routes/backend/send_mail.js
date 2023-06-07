const express = require('express')

const router = express.Router()
const Send_Mail = require(`${__path_controllers}sendmail_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .post(Send_Mail.getList)


    
module.exports = router;





