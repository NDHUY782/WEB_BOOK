const { Schema , model } = require("mongoose")

const GroupModel = new Schema({
    name : {
        type : String,
    },
    status : {
        type : String,
    },
    ordering : {
        type : Number,
    },
    content : {
        type : String,
    },
    avatar : {
        type : String,
    },
    group_acp : {
        type : String,
    },
    id_category : {
        type : String,
    },
    created: {
        user_id: Number,
        user_name: String,
        time: Date,
    },
    modified: {
        user_id: Number,
        user_name: String,
        time: Date,
    }
}, {
    timestamps : true
}) 


module.exports = model('groups' , GroupModel)