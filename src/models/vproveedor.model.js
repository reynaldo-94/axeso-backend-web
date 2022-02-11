import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario_web.model';
import Linea from './linea.model';
const VProveedor = sequelize.define('vproveedor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    proveedorid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ruc: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    fax: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    estadoid: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


VProveedor.hasMany(Usuario, { foreignKey: 'proveedorid' });
Usuario.belongsTo(VProveedor, { foreignKey: 'proveedorid' });

VProveedor.hasMany(Linea, { foreignKey: 'proveedorid' });
Linea.belongsTo(VProveedor, { foreignKey: 'proveedorid' });

export default VProveedor;