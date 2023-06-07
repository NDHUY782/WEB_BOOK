const { Schema , model } = require("mongoose")


const bcrypt = require('bcrypt')


const AuthenModel = new Schema({
    username : {
        type : String,
        minLenght:3,
        maxLenght:60
    },
    password : {
        type : String,
        minLenght:3,

    },
    roles: {
        type: String,
    }
}, {
    timestamps : true
}) 


AuthenModel.pre("save" , async function(next) {
         if(!this.isModified('password')) {
            return(next)
         }
         const hash = await  bcrypt.genSalt(10)
         .then((salt => bcrypt.hash(this.password, salt)));
         this.password = hash;
         next()

    })

module.exports = model('AuthenModel' , AuthenModel)
