import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const RubroMotivoReclamo = sequelize.define('vrubro_motivo_reclamo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    descripcion: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default RubroMotivoReclamo;