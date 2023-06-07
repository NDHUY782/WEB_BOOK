const routerName = 'blogs';
const renderName = `frontend/page/${routerName}`;

const BlogService = require(`${__path_services}frontend/blog_service`);

const ProductModel = require('../models/product_model')

module.exports = {
    ListMenu: async (req , res , next) => {
        let { data_menu, data_slider } =   await BlogService.ListMenu(req, res)
        res.render('frontend/page/home' , {
            data_menu,
            data_slider
        })
    },

    ListProduct: async (req , res , next) => {
        let data = await ProductModel.find({})
        .select('name avatar status ordering id_category created modified price discount')
        res.render('frontend/page/product',{data})
    },

    // getProductDetail:async (req , res , next) => {
    //     let data = await ProductModel.findById({})
    
    //     res.render('frontend/page/product_detail',{data})
    // },

    ListBlog: async (req , res , next) => {
        let { data_blog } =   await BlogService.ListBlog(req, res)
        res.render('frontend/page/blog', {
            data_blog,
        })
    },

    ListBlogDetail: async (req , res , next) => {
        let { data_blog_detail } =   await BlogService.ListBlogDetail(req, res)
        res.render('frontend/page/blog_detail',{
            data_blog_detail
        })
    },

    
}