import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const IndicadoresServicioDiasInventario = sequelize.define('indicadoresservicio_diasinventario', {
    anio: {
        type: Sequelize.STRING
    },
    mesid: {
        type: Sequelize.INTEGER
    },
    mesnom: {
        type: Sequelize.STRING
    },
    num_target: {
        type: Sequelize.INTEGER
    },
    inventario_final: {
        type: Sequelize.FLOAT
    },
    
    costo_venta: {
        type: Sequelize.FLOAT
    },
    dias_inventario: {
        type: Sequelize.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioDiasInventario