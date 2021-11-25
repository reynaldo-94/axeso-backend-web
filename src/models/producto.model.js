import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//import Usuario from './usuario.model';
const Producto = sequelize.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    productoid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    sublineaid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Sublinea',
            key: 'sublineaid'
        }
    },
    proveedorid: {
        type: Sequelize.STRING,
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

export default Producto;