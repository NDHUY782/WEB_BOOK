const routerName = 'menu';
const renderName = `backend/page/${routerName}/`;

const MenuModel = require(`${__path_models}menu_model`)
const CategoryModel = require(`${__path_models}category_model`)
const notify = require(`${__path_configs}notify`)
const paramsHelpers = require(`${__path_helpers}params`)
const utilsHelpers  = require(`${__path_helpers}utils`)
const util = require('util');
const { Z_BLOCK } = require('zlib');


module.exports = {
    getAll: async (req) => { // (GetData for LIST, Pagination, Search)
        let condition = {}
        let keyword   = paramsHelpers.getParam(req.query, 'keyword', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
        let sortField = paramsHelpers.getParam(req.session, 'sortField', 'ordering')
        let sortType  = paramsHelpers.getParam(req.session, 'sortType', 'asc')
        let sort = {}

        let pagination = {
            totalItem       : 1,
            totalItemPerPage: 10,
            currentPage     : parseInt(paramsHelpers.getParam(req.query, 'page', 1)),
            pageRange       : 3
        }

        sort[sortField] = sortType
        
        if (currentStatus === 'all'){
            if(keyword !== '') condition = {name: {$regex: keyword, $options: 'i'}}
        }else {
            condition = {status: currentStatus, name: {$regex: keyword, $options: 'i'}}
        }

        let count = await MenuModel.count(condition)
        pagination.totalItem = count

        let data = await MenuModel
                            .find(condition)
                            .sort(sort)
                            .skip((pagination.currentPage-1) * pagination.totalItemPerPage)
                            .limit(pagination.totalItemPerPage)

        return{
            data, 
            currentStatus,
            keyword,
            pagination,
            sortField,
            sortType
        }

    },

    countAll: async (req) => { // Filter 
        let currentStatus = req.params.status;
        let statusFilter = utilsHelpers.createFilterStatus(currentStatus, MenuModel)
        return statusFilter
    },

    changeStatus: async (req, res) => { // Change status in table
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
        let status        = (currentStatus === 'active') ? 'inactive' : 'active'

        MenuModel.updateOne({_id:id}, {status: status}, (err,result) => {
        });
        
        return {
            success: true,
            id,
            currentStatus,
            status
        }
    },

    deleteItem: async (req, res) => { // Delete one items 
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        MenuModel.deleteOne({_id:id}, (err,result) => {
            req.flash('warning', notify.DELETE_SUCCESS, false)           
            res.redirect('/admin/menu/')
        });
    },
    
    getForm: async (req, res) => {
        let id = paramsHelpers.getParam(req.params, 'id', '')
        let data = {}

        let categoryItems = await CategoryModel.find({status: 'active'}, { id: 1, name: 1, link:1 })
        categoryItems.unshift({ link: 'novalue', name: 'Choose Link' })

        if (id === '') { /// add
            pageTitle = 'Add - Form'
        } else { /// edit
            data = await MenuModel.findById(id)
            pageTitle = 'Edit - Form'
        }
        return {
            pageTitle,
            categoryItems,
            data
        }
    },

    saveItem: async (req, res) => { // (NewData add, edit item)
        req.body = JSON.parse(JSON.stringify(req.body))
        let item = Object.assign(req.body)

        if (typeof item !== 'undefined' && item.id !== "") { //edit
            let data = {}

            if (item.parent !== undefined) {
                let data_child = {}
                let child = []
    
                if(Array.isArray(item.parent)){
                    data.parent = item.parent[0]
                    for(let i = 0; i < item.parent.length; i++){
                        data_child.name_child = item.menu_child[i]
                        data_child.link_child = item.link_child[i]
                        child.push(data_child)
                        data_child = {}
                    }

                }else {
                    data.parent = item.parent
                    data_child.name_child = item.menu_child
                    data_child.link_child = item.link_child
                    await child.push(data_child)
                }
                data.child = child
                // data.link  = ''

            }else {
                data.parent = 'false'
                // data.link   = item.link
            }
            data.name   = item.menu
            data.status = item.status
            data.link  = item.link

            if(data.child === undefined) data.child = []

            MenuModel.updateOne({ _id: item.id }, {
                name: data.name,
                status: data.status,
                parent: data.parent,
                link  : data.link,
                child : data.child
            }, (err, result) => {
                req.flash('success', notify.EDIT_SUCCESS, false)
                res.redirect('/admin/menu/')
            });
        } 
        else { //add
            let data = {}
            if (item.parent !== undefined) {
                let data_child = {}
                let child = []
    
                if(Array.isArray(item.parent)){
                    data.parent = item.parent[0]
                    for(let i = 0; i < item.parent.length; i++){
                        data_child.name_child = item.menu_child[i]
                        data_child.link_child = item.link_child[i]
                        child.push(data_child)
                        data_child = {}
                    }

                }else {
                    data.parent = item.parent
                    data_child.name_child = item.menu_child
                    data_child.link_child = item.link_child
                    child.push(data_child)
                }
                data.child = child
                // data.link  = ''

            }else {
                data.parent = 'false'
                // data.link   = item.link
            }
            data.name   = item.menu
            data.status = item.status
            data.link   = item.link
    
            await new MenuModel(data).save().then(() => {
                req.flash('success', notify.ADD_SUCCESS, false)
                res.redirect('/admin/menu/')
            })
        }
    },

    changeMultipleAction: async (req, res) => { // (Delete multiple, Change status multiple)
        let action = req.body.action
        if (action === 'delete') {
            MenuModel.deleteMany({_id: {$in: req.body.cid}}, (err, result) =>{
                req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.deletedCount), false) 
                res.redirect('/admin/menu/')
            })
        }else{
            MenuModel.updateMany({_id: {$in: req.body.cid}}, {status: req.body.action}, (err, result) =>{
                req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.modifiedCount), false) 
                res.redirect('/admin/menu/')
            })
        }

     },

     getSort: async (req, res) => { //  
        req.session.sortField      = paramsHelpers.getParam(req.params, 'sort_field', 'ordering')
        req.session.sortType       = paramsHelpers.getParam(req.params, 'sort_type', 'asc')
        
        res.redirect('/admin/category/')
    },

    show_frontend: async () => {
        let data = await MenuModel.find({status: "active"})
        return {
            data
        }
    },
}
