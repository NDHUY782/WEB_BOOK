const routerName = 'product';
const renderName = `backend/page/${routerName}/`;

const ProductService = require(`${__path_services}/product_service`);


module.exports = {
    getlist : async (req , res , next) => {
        let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await ProductService.getAll(req)
        let statusFilter                                  = await ProductService.countAll(req)
        let pageTitle = 'Blog Product'
 
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
        let { pageTitle, data, categoryItems } = await (ProductService.getForm(req))
        res.render(`${renderName}form` , {
            pageTitle,
            items :  data,
            categoryItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await ProductService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await ProductService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await ProductService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await ProductService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await ProductService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await ProductService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await ProductService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await ProductService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await ProductService.getFilterCategory(req, res)
    },

    getRss: async (req , res , next) => {
        res.send('Hello')
    },
}
