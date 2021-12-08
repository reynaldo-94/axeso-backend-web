import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Cliente from './cliente.model';
const Vzona = sequelize.define('vzona', {
    zonaid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    vendedorid: {
        type: Sequelize.STRING
    },
    canalid: {
        type: Sequelize.STRING
    },
    subcanalid: {
        type: Sequelize.STRING
    },
    unidadnegocioid: {
        type: Sequelize.STRING
    },
    activo: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});
Vzona.hasMany(Cliente, { foreignKey: 'zonaid' });
Cliente.belongsTo(Vzona, { foreignKey: 'zonaid' });
export default Vzona;