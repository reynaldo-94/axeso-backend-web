import Sequelize from 'sequelize';
import { sequelize } from '../database/database-bi';

const IndicadoresServicioDiasInventario = sequelize.define('indicadorservicio_diasinventario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
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
    tableName: 'indicadorservicio_diasinventario',
    freezeTableName: true,
    timestamps: false
});

export default IndicadoresServicioDiasInventario