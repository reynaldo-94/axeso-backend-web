import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioFillRate = sequelize.define('indicadoresservicio_fillrate', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
    },
    idperiodo: {
        type: Sequelize.INTEGER 
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
    num_target: {
        type: Sequelize.STRING
    },
    cantidad_pedida: {
        type: Sequelize.FLOAT
    },
    cantidad_ingresada: {
        type: Sequelize.FLOAT
    },
    fill_rate: {
        type: Sequelize.STRING
    },
}, {
    tableName: 'indicadorservicio_fillrate',
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioFillRate