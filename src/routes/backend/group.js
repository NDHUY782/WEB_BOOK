const express = require('express')

const router = express.Router()
const GroupController = require(`${__path_controllers}/group_controller`)



    
router
    .route('(/status/:status)?')
    .get(GroupController.getlist)

router
    .route('/form(/:id)?')
    .get(GroupController.getForm)
    .post(GroupController.saveItem)
    // .post(uploadAvatar, GroupController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(GroupController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(GroupController.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(GroupController.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(GroupController.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(GroupController.getFilterCategory)      

router
    .route('/delete/:id')
    .get(GroupController.deleteItem)
    
router
    .route('/multipleAction')
    .post(GroupController.changeMultipleAction)

router
    .route('/upload')
    .get(GroupController.getUpload)
    .post(GroupController.saveUpload)

module.exports = router;