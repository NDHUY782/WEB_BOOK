const FrontendHelper = require('../helpers/frontend')


module.exports = async(req , res , next) => {
    await FrontendHelper.getMenu(req).then((result) => {
        res.locals.listMenu = result.data;
    })
    
    next();
} ;