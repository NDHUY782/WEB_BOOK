
const express = require('express')
const router = express.Router()

const BlogController = require(`${__path_controllers}/blog_controller`)

 
router
    .route('/')
    .get(BlogController.ListMenu)
    
// router
//     .route('/product')
//     .get(BlogController.ListProduct)

    
router
    .route('/blog(/:slug)?')
    .get(BlogController.ListBlog) 

router
    .route('/blog_detail(/:slug)?')
    .get(BlogController.ListBlogDetail)
    


module.exports = router;