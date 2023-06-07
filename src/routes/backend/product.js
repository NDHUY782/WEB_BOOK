const express = require('express')

const router = express.Router()
const ProductController = require(`${__path_controllers}product_controller`)


router
    .route('(/status/:status)?')
    .get(ProductController.getlist)

router
    .route('/form(/:id)?')
    .get(ProductController.getForm)
    .post(ProductController.saveItem)
    // .post(uploadAvatar, ProductController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(ProductController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(ProductController.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(ProductController.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(ProductController.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(ProductController.getFilterCategory)      

router
    .route('/delete/:id')
    .get(ProductController.deleteItem)
    
router
    .route('/multipleAction')
    .post(ProductController.changeMultipleAction)

router
    .route('/upload')
    .get(ProductController.getUpload)
    .post(ProductController.saveUpload)
 

module.exports = router;