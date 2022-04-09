import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

import Submenu from './submenu.model';
require('sequelize-hierarchy')(Sequelize);
//menuid, titulo, descripcion, icono, ruta, orden
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
    orden: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Menu.hasMany(Submenu, { as: 'submenu', foreignKey: 'menuid' });
export default Menu;