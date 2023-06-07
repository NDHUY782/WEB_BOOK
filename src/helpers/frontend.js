
const MenuService = require(`${__path_services}/menu_service`);


module.exports = {
    getMenu: async (req) => {
        const data = await MenuService.getAll(req)
        return data
    },
    
} ;
