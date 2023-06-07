const routerName = 'account';
const renderName = `backend/page/${routerName}/`;

const AccountService = require(`${__path_services}/account_service`);



module.exports = {

    getlist : async (req , res , next) => {
        
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await AccountService.getAll(req)
        let statusFilter                                  = await AccountService.countAll(req)
        let pageTitle = 'Account'


        
        try {
            res.render(`${renderName}list` ,{
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
                idCategory,
                
                
            })
        } catch (error) {
            console.log(error.message)
        }
        
    },

    getForm : async (req , res , next) => {
        let { pageTitle, data, categoryItems } = await (AccountService.getForm(req))
        res.render(`${renderName}form` , {
            pageTitle,
            items :  data,
            categoryItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await AccountService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await AccountService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await AccountService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await AccountService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await AccountService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await AccountService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await AccountService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await AccountService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await AccountService.getFilterCategory(req, res)
    },

}