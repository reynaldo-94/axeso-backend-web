import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioLeadTime = sequelize.define('indicadoresservicio_leadtime', {
    anio: {
        type: Sequelize.STRING
    },
    mesid: {
        type: Sequelize.INTEGER
    },
    mesnom: {
        type: Sequelize.STRING
    },
    leadtime_promedio: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioLeadTime