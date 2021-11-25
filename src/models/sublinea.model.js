import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Producto from './producto.model';
const Sublinea = sequelize.define('sublinea', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    sublineaid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    lineaid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Linea',
            key: 'lineaid'
        }
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Producto.belongsTo(Sublinea, { foreignKey: 'sublineaid' });
Sublinea.hasMany(Producto, { foreignKey: 'sublineaid' });

export default Sublinea;