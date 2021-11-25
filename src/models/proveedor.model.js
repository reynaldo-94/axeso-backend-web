import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario.model';
import Linea from './linea.model';
const Proveedor = sequelize.define('proveedor', {
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


Proveedor.hasMany(Usuario, { foreignKey: 'proveedorid' });
Usuario.belongsTo(Proveedor, { foreignKey: 'proveedorid' });

Proveedor.hasMany(Linea, { foreignKey: 'proveedorid' });
Linea.belongsTo(Proveedor, { foreignKey: 'proveedorid' });

export default Proveedor;