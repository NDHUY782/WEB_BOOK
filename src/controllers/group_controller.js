const routerName = 'group';
const renderName = `backend/page/${routerName}/`;

const GroupService = require(`${__path_services}/group_service`);



module.exports = {

    getlist : async (req , res , next) => {
        
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await GroupService.getAll(req)
        let statusFilter                                  = await GroupService.countAll(req)
        let pageTitle = 'Groups'


        
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
        let { pageTitle, data, categoryItems } = await (GroupService.getForm(req))
        res.render(`${renderName}form` , {
            pageTitle,
            items :  data,
            categoryItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await GroupService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await GroupService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await GroupService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await GroupService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await GroupService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await GroupService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await GroupService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await GroupService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await GroupService.getFilterCategory(req, res)
    },

}