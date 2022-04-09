import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const TipoReclamo = sequelize.define('vtiporeclamo', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default TipoReclamo;