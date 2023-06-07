const express = require('express')

const router = express.Router()
const SliderController = require(`${__path_controllers}/slider_controller`)


router
    .route('(/status/:status)?')
    .get(SliderController.getlist)

router
    .route('/form(/:id)?')
    .get(SliderController.getForm)
    .post(SliderController.saveItem)
    // .post(uploadAvatar, SliderController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(SliderController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(SliderController.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(SliderController.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(SliderController.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(SliderController.getFilterCategory)      

router
    .route('/delete/:id')
    .get(SliderController.deleteItem)
    
router
    .route('/multipleAction')
    .post(SliderController.changeMultipleAction)

router
    .route('/upload')
    .get(SliderController.getUpload)
    .post(SliderController.saveUpload)

module.exports = router;