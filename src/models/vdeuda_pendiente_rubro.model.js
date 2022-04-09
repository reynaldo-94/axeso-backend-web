import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const DeudaPendienteRubro = sequelize.define('vdeuda_pendiente_rubro', {
    idtipo: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    cnommotivo: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DeudaPendienteRubro;