
const express = require('express')
const router = express.Router()

const BlogController = require(`${__path_controllers}/blog_controller`)
const ProductController = require('../../controllers/product_controller')

    
router
    .route('/add-to-cart')
    .get(ProductController.ListProduct)
    
   


module.exports = router;