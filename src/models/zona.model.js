import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Zona = sequelize.define('zona', {
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
export default Zona;