import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioLeadTime = sequelize.define('indicadoresservicio_leadtime', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
    },
    idperiodo: {
        type: Sequelize.INTEGER,
    },
    anio: {
        type: Sequelize.STRING
    },
    idmes: {
        type: Sequelize.INTEGER
    },
    mes: {
        type: Sequelize.STRING
    },
    prom_target_lead: {
        type: Sequelize.INTEGER
    },
    prom_lead_time: {
        type: Sequelize.FLOAT
    },
}, {
    tableName: 'indicadorservicio_leadtime',
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioLeadTime