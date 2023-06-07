const { Schema , model } = require("mongoose")

const bcrypt = require('bcrypt')


const userModel = new Schema({
    name : {
        type : String,
        require:true,
        minLenght:3,
        maxLenght:60
    },
    password : {
        type: String,
        default:'$2b$10$jRRcKe04qJBVSdqYISQymeHKJnIiq2K2UtDYeK9jm9QD.mZIqQcKy',
        
    },
    group : {
        id: String,
        type: String,
        name:String,
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
    email: {
        type: String,
        require:true,
    },
    mobile: {
        type: String,
        require:true,
    },
    id_category : {
        type : String,
    },
    is_admin:{
        type: Number,
        require:true,
    },
    is_varified:{
        type: Number,
        default:0,
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
    token: {
        type: String,
        default:''
    }

}, {
    timestamps : true
}) 

// userModel.pre("save" , async function(next) {
//          if(!this.isModified('password')) {
//             return(next)
//          }
//          const hash = await  bcrypt.genSalt(10)
//          .then((salt => bcrypt.hash(this.password, salt)));
//          this.password = hash;
//          next()

//     })

module.exports = model('usermodels' , userModel)
