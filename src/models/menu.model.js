import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
require('sequelize-hierarchy')(Sequelize);
//import Submenu from './submenu.model';
const Menu = sequelize.define('menu', {
    menuid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    icono: {
        type: Sequelize.STRING
    },
    ruta: {
        type: Sequelize.STRING
    },
    parentid: {
        type: Sequelize.INTEGER,
        hierarchy: true // <------- HERE
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Menu.hasMany(Menu, { as: 'submenu', foreignKey: 'parentid' });

export default Menu;