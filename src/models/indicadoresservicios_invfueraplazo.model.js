import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioInvFueraPlazo = sequelize.define('indicadoresservicios_invfueraplazo', {
    anio: {
        type: Sequelize.STRING
    },
    mesid: {
        type: Sequelize.INTEGER
    },
    mesnom: {
        type: Sequelize.STRING
    },
    target_fp: {
        type: Sequelize.FLOAT
    },
    inventario_valorizado: {
        type: Sequelize.FLOAT
    },    
    inventario_fueraplazo: {
        type: Sequelize.FLOAT
    },
    fuera_plazo: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioInvFueraPlazo