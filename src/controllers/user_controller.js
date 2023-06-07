
const UserModel = require('../models/user_model');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const { set } = require('mongoose');
var session = require('express-session')
const randormString = require("randomstring")
const config = require('../configs/config')


const securePassword = async (password) => {
    try {
        const passwordHash = await  bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}

// const securePassword = userModel.pre("save" , async function(next) {
//     if(!this.isModified('password')) {
//        return(next)
//     }
//     const hash = await  bcrypt.genSalt(10)
//     .then((salt => bcrypt.hash(this.password, salt)));
//     this.password = hash;
//     next()

//----------Reser Password
const sendResetPasswordMail = async(name,email,token) => {
    try {
        let transporter = nodemailer.createTransport({
                
            service: "gmail",
            auth: {
            user:config.emailUser, // generated ethereal user
            pass:config.emailPassword , // generated ethereal password
            },
        });

        
        const mailOption = {
            from: config.emailUser, // sender address
            to: email, // list of receivers
            subject: "For reset passsword", // Subject line
            text: "Xin Cảm Ơn - Chúc Bạn Có 1 Ngày Tốt Lành", // plain text body
            html: '<p>Hello'+name+',please click here to <a href="http://localhost:3000/forget-password?token='+token+'"> Resset pass </a> your Password.</p>'
        } 
        transporter.sendMail(mailOption,function (error,info) {
            if (err) {
                console.log(error)
            } else {
                console.log("email has been sent",info.response)
            }
        })
        

    } catch (error) {
        console.log(error.message)
    }
}





const loadRegister = async(req,res)=> {
    try {

        res.render('./../views/frontend/page/users/registration.ejs')
        
    } catch (error) {
        console.log(err.message)
    }
}
// ------------Send Maill---------------
const sendMail = async(name,email,user_id) => {
    try {
        let transporter = nodemailer.createTransport({
                
            service: "gmail",
            auth: {
            user:config.emailUser, // generated ethereal user
            pass:config.emailPassword , // generated ethereal password
            },
        });

        
        const mailOption = {
            from: config.emailUser, // sender address
            to: email, // list of receivers
            subject: "Please Check Ur Mail", // Subject line
            text: "Xin Cảm Ơn - Chúc Bạn Có 1 Ngày Tốt Lành", // plain text body
            html: '<p>Hello'+name+',please click here to <a href="http://localhost:3000/verify?id='+user_id+'"> Verified </a> your mail.</p>'
        } 
        transporter.sendMail(mailOption,function (error,info) {
            if (err) {
                console.log(error)
            } else {
                console.log("email has been sent",info.response)
            }
        })
        

    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async (req,res) => {
    try {
        const spassword = await securePassword(req.body.password)
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            avatar: req.file.filename,
            password: spassword,
            is_admin: 0,

        });

        const userData = await user.save()

        if(userData) {

            sendMail(req.body.name,req.body.email,userData._id)

            res.render('./../views/frontend/page/users/registration.ejs',{message:"ur registration has been successfully, Please check ur mail to verify"})
        }
        else {
            es.render('./../views/frontend/page/users/registration.ejs',{message:"ur registration has been fallure"})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const verifyMail = async(req,res)=> {
    try {
       const updateInfo = await UserModel.updateOne({_id:req.query.id},{$set:{ is_varified:1} })
       res.render('./../views/frontend/page/users/email-verified.ejs')

    } catch (error) {
        console.log(error.message)
    }
}

// logi user 

const loginLoad = async(req,res)=> {
    try {
        res.render('./../views/frontend/page/users/login.ejs')
        
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
                if (userData.is_varified === 0) {
                    res.render('./../views/frontend/page/users/login.ejs',{message:"Please verify ur mail"})
                } else {
                    res.session,user_id = userData._id;
                    res.redirect('http://localhost:3000')
                }
            } else {
                res.render('./../views/frontend/page/users/login.ejs',{message:"Email-Password is sai"})
            }

        } else {
            res.render('./../views/frontend/page/users/login.ejs',{message:"Email-Password is Wrong"})
        }

        
    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async (req,res)=> {
    try {
        
        const UserDate = await UserModel.findById({_id:req.session.id})
        res.render('./../views/frontend/page/users/home.ejs',{user: UserDate })
    } catch (error) {
        console.log(error.message)
    }
}
const userLogout = async(req,res)=> {
    try {
        req.session.detroy();
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}
//Quên Mật Khẩu
const forgetLoad = async(req,res)=> {
    try {
        res.render('../views/frontend/page/users/forget.ejs')
    } catch (error) {
        console.log(error.message)
    }
}
const forgetVerify = async(req,res)=> {
    try {
        const email = req.body.email
        const userData = await UserModel.findOne({email:email})
        if (userData) {
            
            if (userData.is_varified === 0) {
                res.render('../views/frontend/page/users/forget.ejs',{message:"Please Verify urr mail"})
            }
            else{
                const randomString = randormString.generate();
                const updateData = await UserModel.updateOne({email:email},{$set:{ token:randomString}})
                sendResetPasswordMail(userData.name,userData.email,randomString);
                res.render('../views/frontend/page/users/forget.ejs',{message:"Please check ur mail to reset pass"})
            }
        } else {
            res.render('../views/frontend/page/users/forget.ejs',{message:"User incorrect!!!!"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const forgetPasswordLoad = async(req,res)=> {
    try {
        const token = req.query.token;
        const tokenData = await UserModel.findOne({token:token})
        if (tokenData) {
            res.render('../views/frontend/page/users/forget-password.ejs',{user_id:tokenData._id})
        } else {
            res.render('/404',{message:'Token is invalid'})
        }
    } catch (error) {
        console.log(error.message)
    }
}
const resetPassword = async(req,res)=> {
    try {
        const password = req.body.password;
        const user_id = req.body.user_id;
        console.log(password)
        
        const secure_password = await securePassword(password)


        const updatedData = await UserModel.findByIdAndUpdate({_id:user_id},{$set:{ password: secure_password, token:''}})

        res.redirect('/login')

    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadRegister,
    insertUser,
    verifyMail,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    forgetLoad,
    forgetVerify,
    forgetPasswordLoad,
    resetPassword,
}
