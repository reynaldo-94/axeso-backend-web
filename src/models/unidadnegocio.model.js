import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Unidadnegocio = sequelize.define('unidadnegocio', {
    unidadnegocioid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    abreviatura: {
        type: Sequelize.STRING
    },
    ciudad: {
        type: Sequelize.STRING
    },
    activo: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});
export default Unidadnegocio;