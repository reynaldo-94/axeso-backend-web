import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//import Usuario from './usuario.model';
const Almacen = sequelize.define('almacen', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    almacenid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    unidadnegocioid: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Rol.hasMany(Usuario, { foreignKey: 'rolid' });
// Usuario.belongsTo(Rol, { foreignKey: 'rolid' });

export default Almacen;