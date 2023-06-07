const routerName = 'menu';
const renderName = `backend/page/${routerName}/`;


const MenuService = require(`${__path_services}/menu_service`);


module.exports = {
    getList : async (req , res , next) => {
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, sortType, sortField }  = await MenuService.getAll(req)
        let statusFilter                                                       = await MenuService.countAll(req)
        let pageTitle = 'Menu'
 
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

    getForm: async (req , res , next) => {
        let { data, pageTitle, categoryItems}  = await MenuService.getForm(req, res)
        res.render(`${renderName}form` , {
            items : data,
            categoryItems,
            pageTitle
        })
    },

    getSort: async (req , res , next) => {
        await MenuService.getSort(req, res)
    },

    getStatus: async (req , res , next) => {
        let data = await MenuService.changeStatus(req, res)
        res.send(data) 
    },

    deleteItem: async (req , res , next) => {
        await MenuService.deleteItem(req, res)
    },

    saveItem: async (req , res , next) => {
        await MenuService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await MenuService.changeMultipleAction(req, res)
    },
}
