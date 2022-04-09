import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioFillRate = sequelize.define('indicadoresservicio_fillrate', {
    anio: {
        type: Sequelize.STRING
    },
    mesid: {
        type: Sequelize.INTEGER
    },
    mesnom: {
        type: Sequelize.STRING
    },
    cantidad_perdida: {
        type: Sequelize.FLOAT
    },
    cantidad_ingresada: {
        type: Sequelize.FLOAT
    },
    fill_rate: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioFillRate