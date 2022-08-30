import Sequelize from 'sequelize';
import { sequelize } from '../database/database-bi';

const IndicadorServicioInvFueraPlazo = sequelize.define('indicadorservicio_invfueraplazo', {
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
    target_fp: {
        type: Sequelize.STRING
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
    tableName: 'indicadorservicio_invfueraplazo',
    freezeTableName: true,
    timestamps: false
});

export default IndicadorServicioInvFueraPlazo