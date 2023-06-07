const config = require('../configs/notify')
const { notify } = require('../routes/backend')

const options =  {
    username: {
        min:3,
        max:10,
        type: String,
        require:true,
    },
    password : {
        min:3,
        max:10,
        type: String,
        require:true,

    },

}
module.exports = {
    validator:(req)=>{
        req.checkBody('username',{message: "Chưa đúng"})
            .isLength({min:options.username.min,max:options.username.max})


        req.checkBody('password',{message: "Chưa đúng"})
            .isLength({min:options.password.min,max:options.password.max})
    }
}