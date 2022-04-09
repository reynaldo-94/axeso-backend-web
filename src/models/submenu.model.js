import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//submenuid, menuid, titulo, descripcion, icono, ruta, orden
const Submenu = sequelize.define('submenu', {
    submenuid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    menuid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Menu',
            key: 'menuid'
        }
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
export default Submenu;