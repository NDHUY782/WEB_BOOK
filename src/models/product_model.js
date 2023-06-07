const { Schema , model } = require("mongoose")

const ProductModel = new Schema({
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
    },
    quantity : {
        type : Number,
    },
    price : {
        type : Number,
    },
    discount : {
        type : Number,
    },
    arrCheck : [
        String,
    ],
},{
    timestamps : true
})


module.exports = model('products' , ProductModel)