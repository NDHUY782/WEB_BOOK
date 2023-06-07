const { Schema , model } = require("mongoose")
const slug = require("mongoose-slug-generator");

const CartModel = new Schema({
    id_customer: { type: Number },
    id_product: { 
        type: Number 
        },

    name_product: { 
        type: String 
        },
    image_product: { 
        type: String 
        },
   quantity: { 
        type: Number 
        },
    price_product: { 
        type: Number
         },
    slug: { 
        type: String, 
        slug: "name_product", 
        unique: true
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
    
    
},{
    timestamps : true
})


module.exports = model('carts' , CartModel)