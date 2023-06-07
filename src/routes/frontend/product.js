
const express = require('express')
const router = express.Router()

const BlogController = require(`${__path_controllers}/blog_controller`)
const ProducDetailController = require('../../controllers/productDetail_controller.js')



    
router
    .route('/')
    .get(BlogController.ListProduct)
    
router
    .route('/:id')
    .get(ProducDetailController.ListProductDetail)
    


module.exports = router;