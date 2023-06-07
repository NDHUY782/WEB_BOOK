const { Schema , model } = require("mongoose")

const AccountModel = new Schema({
    name : {
        type : String,
        require:true,
        minLenght:3,
        maxLenght:60
    },
    password : {
        type: String,
        require:true,

    },
    email: {
        type: String,
        require:true,
    },
    mobile: {
        type: String,
        require:true,
    },
    image: {
        type: String,
        require:true,
    },
    is_admin:{
        type: Number,
        require:true,
    },
    is_varified:{
        type: Number,
        default:0
    },
    token: {
        type: String,
        default:''
    }

}, {
    timestamps : true
}) 


module.exports = model('account' , AccountModel)