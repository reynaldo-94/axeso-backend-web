import Sequelize from 'sequelize';
import { sequelizeBi } from '../database/database-bi';

const IndicadorServicioDiasInventario = sequelizeBi.define('indicadorservicio_diasinventario', {
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
    schema: 'public',
    freezeTableName: true,
    timestamps: false
});

export default IndicadorServicioDiasInventario