import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Sublinea from './sublinea.model';
import Usuariolinea from './usuario_weblinea.model';
const Linea = sequelize.define('vlinea', {
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
            model: 'VProveedor',
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

// Linea.hasMany(Usuariolinea, { foreignKey: 'lineaid' });
// Usuariolinea.belongsTo(Linea, { foreignKey: 'lineaid' });
Linea.hasMany(Usuariolinea, { as: 'usuariolinea', foreignKey: 'lineaid' });
//Usuariolinea.hasMany(Linea, { as: 'linea', foreignKey: 'lineaid' });
export default Linea;