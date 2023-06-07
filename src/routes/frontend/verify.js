
const express = require('express')
const router = express.Router()
var path = require('path');
const session = require('express-session')
const config = require('../../configs/config')


const UserController = require(`${__path_controllers}/user_controller`)
const multer = require('multer');

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
router.use(session({secret:config.sessionSerect}))

const auth = require('../../middleware/auth')


const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,path.join(__dirname,'../../public/uploads/items'))  
    },
    filename: function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage:storage});



router
    .route('/')
    .get(UserController.verifyMail)

// router
//     .route('/verify')
//     .get(UserController.verifyMail)




    

module.exports = router;