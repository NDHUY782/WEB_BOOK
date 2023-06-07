
const MenuModel = require(`${__path_models}menu_model`)
const SliderModel = require(`${__path_models}slider_model`)
const ArticleModel = require(`${__path_models}article_model`)
const CategoryModel = require(`${__path_models}category_model`)

const paramsHelpers = require(`${__path_helpers}params`)

module.exports = {
    ListMenu: async (req, res) => {
        let data_menu = {}, data_slider ={}
        data_menu = await MenuModel.find({status: 'active'})
        data_slider = await SliderModel.find({status: 'active'}).sort({ordering : 1})

        return {
            data_menu,
            data_slider
        }
    },

    ListBlog: async (req, res) => {
        let slug            = paramsHelpers.getParam(req.params, 'slug', '')
        let condition = {}

        let categoryItems = await CategoryModel.find({status: 'active'}, { id: 1, name: 1 })
        let categoryItemsFilter = [...categoryItems];
        let arrIdCategory = []
        categoryItems.forEach(value => {
            arrIdCategory.push(value.id)
        })

        categoryItemsFilter.unshift({ id: 'allvalue', name: 'All Category' })

        condition.status = "active"

        if(typeof slug !== 'undefined' && slug !== "") {
            let item = await CategoryModel.findOne({ slug: slug})
            condition.id_category = item.id
        }
        else{
            condition.id_category = { $in: arrIdCategory }
        }
        
        let data_blog = await ArticleModel
               .find(condition)
               .sort({ordering : 1})
        return {
            data_blog,
        }

    },

    ListBlogDetail: async (req, res) => {
        let slug            = paramsHelpers.getParam(req.params, 'slug', '')
        data_blog_detail    = await ArticleModel.find({ slug: slug})

        return {
            data_blog_detail,
        }
    },
}
