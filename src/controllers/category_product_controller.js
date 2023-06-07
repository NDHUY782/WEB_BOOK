const routerName = 'category_product';
const renderName = `backend/page/${routerName}/`;

const CategoryProductService = require(`${__path_services}/category_product_service`);


module.exports = {
    getlist : async (req , res , next) => {
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, sortType, sortField }  = await CategoryProductService.getAll(req)
        let statusFilter                                  = await CategoryProductService.countAll(req)
        let pageTitle = 'HELLOOOOOOOO'
 
        res.render(`${renderName}list` , {
            items :        data,
            pageTitle,
            currentStatus,
            keyword,
            pagination,
            statusFilter:  statusFilter,
            sortType,
            sortField
        })
    },

    getForm : async (req , res , next) => {
        let { pageTitle, data } = await (CategoryProductService.getForm(req))

        res.render(`${renderName}form` , {
            pageTitle,
            items :  data
        });
    },

    getSort: async (req , res , next) => {
        await CategoryProductService.getSort(req, res)
    },

    getStatus: async (req , res , next) => {
        let data = await CategoryProductService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await CategoryProductService.changeOrdering(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await CategoryProductService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await CategoryProductService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await CategoryProductService.changeMultipleAction(req, res)
    },

}
