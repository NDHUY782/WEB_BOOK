const UserModel = require(`${__path_models}user_model`)
const GroupModel = require(`${__path_models}group_model`)
const CategoryModel = require(`${__path_models}category_model`)
const utilsHelpers = require(`${__path_helpers}utils`)
const paramsHelpers = require(`${__path_helpers}params`)
const notify = require(`${__path_configs}notify`)
const fileHelpers = require(`${__path_helpers}file`)

const uploadAvatar = fileHelpers.upload('avatar', `${__path_public}uploads/items/`)

var { validationResult } = require('express-validator')
const util = require('util')
const { getCategory } = require('../controllers/userCtrl')


const routerName = 'user';
const renderName = `backend/page/${routerName}/`;



module.exports = {
    getAll: async (req) => { // (GetData for LIST, Pagination, Search)
        let condition = {}
        let keyword = paramsHelpers.getParam(req.query, 'keyword', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')

        let categoryItems = await CategoryModel.find({}, { id: 1, name: 1 })
        let categoryItemsFilter = [...categoryItems];
        let sortField   = paramsHelpers.getParam(req.session, 'sortField', 'ordering')
        let sortType    = paramsHelpers.getParam(req.session, 'sortType', 'asc')
        let idCategory  = paramsHelpers.getParam(req.session, 'idCategory', '')
        let sort = {}

        categoryItemsFilter.unshift({ id: 'allvalue', name: 'All Category' })

        let pagination = {
            totalItem: 1,
            totalItemPerPage: 999999,
            currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)),
            pageRange: 3
        }
        sort[sortField] = sortType

        if (idCategory !== '' && idCategory !== 'allvalue') condition.id_category = idCategory
        if (currentStatus !== 'all') condition.status = currentStatus
        if (keyword !== '') condition.name = { $regex: keyword, $options: 'i' }

        let count = await UserModel.count(condition)
        pagination.totalItem = count

        let data = await UserModel
            .find(condition)
            .select('name password group email mobile avatar status ordering id_category is_varified is_admin created modified  ')
            .sort(sort)
            .skip((pagination.currentPage - 1) * pagination.totalItemPerPage)
            .limit(pagination.totalItemPerPage)

        return {
            data,
            currentStatus,
            keyword,
            pagination,
            categoryItems,
            categoryItemsFilter,
            sortField,
            sortType,
            idCategory
        }

    },

    countAll: async (req) => { // Filter 
        let currentStatus = req.params.status;
        let statusFilter = utilsHelpers.createFilterStatus(currentStatus, UserModel)
        return statusFilter
    },

    changeStatus: async (req, res) => { // Change status in table
        let id = paramsHelpers.getParam(req.params, 'id', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
        let status = (currentStatus === 'active') ? 'inactive' : 'active'
        let data = {
            status: status,
            modified: {
                user_id: 0,
                user_name: 'admin',
                time: Date.now()
            }
        }

        UserModel.updateOne({ _id: id }, data, (err, result) => {
        });

        return {
            success: true,
            id,
            currentStatus,
            status
        }
    },

    changeOrdering: async (req, res) => { // Change ordering in table
        let id = paramsHelpers.getParam(req.params, 'id', '')
        let ordering = paramsHelpers.getParam(req.params, 'ordering', 0)
        ordering = (ordering < 0) ? 0 : ordering
        let data = {
            ordering: ordering,
            modified: {
                user_id: 0,
                user_name: 'admin',
                time: Date.now()
            }
        }

        UserModel.updateOne({ _id: id }, data, (err, result) => {
        });
        return {
            success: true,
            id,
            ordering
        }

    },

    

    deleteItem: async (req, res) => { // Delete one items 
        let id            = paramsHelpers.getParam(req.params, 'id', '')

        await UserModel.findById(id).then((item) => {
            fileHelpers.remove('src/public/uploads/items/', item.avatar)
        })

        UserModel.deleteOne({_id:id}, (err,result) => {
            req.flash('warning', notify.DELETE_SUCCESS, false)           
            res.redirect('/dhuy782/user/')
        });
    },

    getForm: async (req) => {  // (GetData for FORM, edit, add)
        // let updateInfo = await UserModel.updateOne({_id : req.params.id},{$set:{ is_varified:1} })
        
        let id = paramsHelpers.getParam(req.params, 'id', '')
        let data = {}
        
        let categoryItems = await CategoryModel.find({}, { id: 1, name: 1 })
        categoryItems.unshift({ id: 'novalue', name: 'Choose Category' });
        let groupItems = []

        
        await GroupModel.find({}, { id: 1, name: 1 })
            .then((items) =>{
                groupItems = items;
                groupItems.unshift({ id: 'novalue', name: 'Choose Group' });
            });    
        


        if (id === '') { /// add
            
            pageTitle = 'Add - Form',
            groupItems
        } else { /// edit
            data = await UserModel.findById(id)
            
            pageTitle = 'Edit - Form',
            groupItems
        }
        return {
            pageTitle,
            data,
            categoryItems,
            groupItems,
            
        }
    },

    getSort: async (req, res) => { //  
        req.session.sortField      = paramsHelpers.getParam(req.params, 'sort_field', 'ordering')
        req.session.sortType       = paramsHelpers.getParam(req.params, 'sort_type', 'asc')
        
        res.redirect('/dhuy782/user/')
    },

    getFilterCategory: async (req, res) => { //  
        req.session.idCategory      = paramsHelpers.getParam(req.params, 'id_category', '')
        
        res.redirect('/dhuy782/user/')
    },

    saveItem: async (req, res) => { // (NewData add, edit item)
        uploadAvatar(req, res, async (err) => {
            req.body = JSON.parse(JSON.stringify(req.body))
            let item = Object.assign(req.body)
            if (err) {
                let errorArr = {}
                let data = {}

                let categoryItems = await CategoryModel.find({}, { id: 1, name: 1 })
                categoryItems.unshift({ id: 'novalue', name: 'Choose Category' })
                

                if(err.code === 'LIMIT_FILE_SIZE') err = 'Kích thước file ko phù hợp'
                errorArr['avatar'] = [err]

                if (item.id === '') { /// add
                    pageTitle = 'Add - Form'
                } else { /// edit
                    data = await UserModel.findById(item.id)
                    item.group_id = item.group_id;
                    item.group_name = item.group_name
                    pageTitle = 'Edit - Form'
                }
                
                res.render(`${renderName}form`, {
                    pageTitle,
                    item: data,
                    errorArr,
                    categoryItems
                });
                return;
            }else{
                if (typeof item !== 'undefined' && item.id !== "") { //edit
                    if(req.file == undefined){
                        item.avatar = item.image_old;
                    } else {
                        item.avatar = req.file.filename;
                        fileHelpers.remove('src/public/uploads/items/', item.image_old)
                    }

                    UserModel.updateOne({ _id: item.id }, {
                        
                        ordering: item.ordering,
                        status: item.status,
                        name: item.name,
                        content: item.content,
                        id_category: item.category,
                        avatar: item.avatar,
                        group: {
                            id: item.group_id,
                            name: item.group_name
                        },
                        modified: {
                            user_id: 0,
                            user_name: 'dhuy782',
                            time: Date.now()
                        }
                    }, (err, result) => {
                        req.flash('success', notify.EDIT_SUCCESS, false)
                        res.redirect('/dhuy782/user/')
                    });
                } 
                else { // add
                    // item.avatar = []
                    // req.files.forEach((results) => {
                    //     item.avatar.push(results.filename)
                    // })
                    item.avatar = req.file.filename
                    item.id_category = item.category
                    
                    item.created = {
                        user_id: 0,
                        user_name: "admin",
                        time: Date.now()
                    }
                    item.group = {
                        id: item.group_id,
                        name: item.group_name
                    }
                    await new UserModel(item).save().then(() => {
                        req.flash('success', notify.ADD_SUCCESS, false)
                        res.redirect('/dhuy782/user/')
                    })
                }
            }
        })
    },

    changeMultipleAction: async (req, res) => { // (Delete multiple, Change status multiple)
        let action = req.body.action
        let id     = req.body.cid
        if (action === 'delete') {
            if(Array.isArray(id)){
                for (let index = 0; index < id.length; index++) {
                    await UserModel.findById(id[index]).then((item) => {
                        fileHelpers.remove('src/public/uploads/items/', item.avatar)
                    })
                }
            } else {
                await UserModel.findById(id).then((items) => {
                    fileHelpers.remove('src/public/uploads/items/', items.avatar)
                })
            }

            UserModel.deleteMany({ _id: { $in: req.body.cid } }, (err, result) => {
                req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.deletedCount), false)
                res.redirect('/dhuy782/user/')
            })
        } else {
            let data = {
                status: req.body.action,
                modified: {
                    user_id: 0,
                    user_name: 'dhuy782',
                    time: Date.now()
                }
            }

            UserModel.updateMany({ _id: { $in: req.body.cid } }, data, (err, result) => {
                req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.modifiedCount), false)
                res.redirect('/dhuy782/user/')
            })
        }

    },

    saveUpload: async (req, res) => {
        uploadAvatar(req, res, (err) => {
            let error = ''
            if (err) {
                error = err
            }
        })
         res.render(`${renderName}upload`);
    }

}
