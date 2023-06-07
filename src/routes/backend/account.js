const express = require('express')

const router = express.Router()
const AccountController = require(`${__path_controllers}/account_controller`)



    
router
    .route('(/status/:status)?')
    .get(AccountController.getlist)

router
    .route('/form(/:id)?')
    .get(AccountController.getForm)
    .post(AccountController.saveItem)
    // .post(uploadAvatar, AccountController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(AccountController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(AccountController.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(AccountController.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(AccountController.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(AccountController.getFilterCategory)      

router
    .route('/delete/:id')
    .get(AccountController.deleteItem)
    
router
    .route('/multipleAction')
    .post(AccountController.changeMultipleAction)

router
    .route('/upload')
    .get(AccountController.getUpload)
    .post(AccountController.saveUpload)

module.exports = router;