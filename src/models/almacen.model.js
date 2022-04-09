import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//import Usuario from './usuario_web.model';
const Almacen = sequelize.define('almacen', {

    almacenid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    unidadnegocioid: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    para_app: {
        type: Sequelize.BOOLEAN
    },
    para_web: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Rol.hasMany(Usuario, { foreignKey: 'rolid' });
// Usuario.belongsTo(Rol, { foreignKey: 'rolid' });

export default Almacen;