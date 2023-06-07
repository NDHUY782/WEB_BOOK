const { Schema , model } = require("mongoose")


const SendMail_Model = new Schema({
    mail : {
        type : String,
        minLenght:3,
        maxLenght:60
    },
    
}, {
    timestamps : true
}) 

module.exports = model('sendmail' , SendMail_Model)