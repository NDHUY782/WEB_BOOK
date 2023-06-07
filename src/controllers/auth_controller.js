
const routerName = 'login';
const renderName = `backend/${routerName}/`;

const layoutLogin = `${__path_views }/backend/login.ejs`

const bcrypt = require('bcrypt');
const UserModel = require('../models/user_model');
const utilsHelpers  = require(`${__path_helpers}utils`)
const paramsHelpers = require(`${__path_helpers}params`)
const notify  		= require(`${__path_configs}notify`)
const Parser = require('rss-parser');
const parser = new Parser();

const getLogin = async (req , res) => {
    let item = {email:'','password': ''};
    let errors = null;
    try {
        res.render('./../views/backend/page/auth/login.ejs',{layout: layoutLogin,errors,item })
    } catch (error) {
        console.log(error.message)
    }

}
const verifyLogin = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password
        
        const userData = await UserModel.findOne({email:email})

        if (userData) {
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if (passwordMatch == true ) {
                if (userData.is_admin === 0) {
                    res.render('./../views/backend/page/auth/login.ejs',{message:"Email-Password is sai"},{layout: layoutLogin})
                } else {
                    res.session,user_id = userData._id;
                    res.redirect('http://localhost:3000/dhuy782')
                }
                    
            } else {
                res.render('./../views/backend/page/auth/login.ejs',{message:"Email-Password is sai"},{layout: layoutLogin })
            }

        } else {
            res.render('./../views/backend/page/auth/login.ejs',{message:"Email-Password is Wrong"},{layout: layoutLogin })
        }

        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getLogin,
    verifyLogin
}