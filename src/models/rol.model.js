import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario.model';
const Rol = sequelize.define('rol', {
    rolid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Rol.hasMany(Usuario, { foreignKey: 'rolid' });
Usuario.belongsTo(Rol, { foreignKey: 'rolid' });

export default Rol;