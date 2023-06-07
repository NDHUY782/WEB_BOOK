const routerName = 'slider';
const renderName = `backend/page/${routerName}/`;

const SliderService = require(`${__path_services}/slider_service`);


module.exports = {
    getlist : async (req , res , next) => {
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await SliderService.getAll(req)
        let statusFilter                                  = await SliderService.countAll(req)
        let pageTitle = 'Blog Slider'
 
        res.render(`${renderName}list` , {
            items :        data,
            pageTitle,
            currentStatus,
            keyword,
            pagination,
            statusFilter:  statusFilter,
            categoryItems,
            categoryItemsFilter,
            sortType,
            sortField,
            idCategory
        })
    },

    getForm : async (req , res , next) => {
        let { pageTitle, data, categoryItems } = await (SliderService.getForm(req))
        res.render(`${renderName}form` , {
            pageTitle,
            items :  data,
            categoryItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await SliderService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await SliderService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await SliderService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await SliderService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await SliderService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await SliderService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await SliderService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await SliderService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await SliderService.getFilterCategory(req, res)
    },

}