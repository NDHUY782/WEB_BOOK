const express = require('express')

const router = express.Router()
const UserCtrller = require(`${__path_controllers}/userCtrl`)



    
router
    .route('(/status/:status)?')
    .get(UserCtrller.getlist)

router
    .route('/form(/:id)?')
    .get(UserCtrller.getForm)
    .post(UserCtrller.saveItem)
    // .post(uploadAvatar, UserCtrller.saveItem)

router
    .route('/change-status/:id/:status')
    .get(UserCtrller.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(UserCtrller.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(UserCtrller.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(UserCtrller.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(UserCtrller.getFilterCategory)      

router
    .route('/delete/:id')
    .get(UserCtrller.deleteItem)
    
router
    .route('/multipleAction')
    .post(UserCtrller.changeMultipleAction)

router
    .route('/upload')
    .get(UserCtrller.getUpload)
    .post(UserCtrller.saveUpload)

module.exports = router;