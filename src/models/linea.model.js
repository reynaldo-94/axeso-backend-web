import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Sublinea from './sublinea.model';
const Linea = sequelize.define('linea', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    lineaid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    proveedorid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Proveedor',
            key: 'proveedorid'
        }
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Linea.hasMany(Sublinea, { foreignKey: 'lineaid' });
Sublinea.belongsTo(Linea, { foreignKey: 'lineaid' });

export default Linea;