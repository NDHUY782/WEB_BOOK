
const express = require('express')

const router = express.Router()
const DashBoardController = require(`${__path_controllers}/dashboard_controller`)
 
router
    .route('/')
    .get(DashBoardController.getList)  

module.exports = router;