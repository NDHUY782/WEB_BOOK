
const SendMail_Model = require('../models/sendmail_model');
const nodemailer = require("nodemailer");

module.exports = {
    getList: async (req , res , next) => {
            "use strict";
            

            // async..await is not allowed in global scope, must use a wrapper
            
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                
                service: "gmail",
                auth: {
                user:'huynguyen07080112@gmail.com', // generated ethereal user
                pass: 'llaxqymogthnyypt', // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'huynguyen07080112@gmail.com', // sender address
                to: "<quochuy22122002@gmail.com>", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Xin Cảm Ơn - Chúc Bạn Có 1 Ngày Tốt Lành", // plain text body
                html: "<b>Xin Cảm Ơn - Chúc Bạn Có 1 Ngày Tốt Lành</b>", // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            

            




        const { mail }     = req.body 

        const Send_Mail = await SendMail_Model.create({ mail })
        
        res.send({
            
            Send_Mail
        }
            
        ) 
    },

    
    
}
