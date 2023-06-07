const routerName = 'user';
const renderName = `backend/page/${routerName}/`;

const UserService = require(`${__path_services}/user_service`);
const UserModel = require('../models/user_model');

const getlist = async (req , res , next) => {
        
    // Promise.all([])
    let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await UserService.getAll(req)
    let statusFilter                                  = await UserService.countAll(req)
    let pageTitle = 'Users'


    
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
    
    
}

module.exports = {
    getlist,

    

    getForm : async (req , res ) => {

        
        let { pageTitle, data, categoryItems,groupItems } = await (UserService.getForm(req))
        
        res.render(`${renderName}form` , {
           
            pageTitle,
            items :  data,
            categoryItems,
            groupItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await UserService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await UserService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await UserService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await UserService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await UserService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await UserService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await UserService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await UserService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await UserService.getFilterCategory(req, res)
    },

}