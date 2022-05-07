import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const DashboardSellin = sequelize.define('dashboard_sellin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
    },
    idlinea: {
        type: Sequelize.STRING
    },
    sellin_cantidad: {
        type: Sequelize.FLOAT
    },
    sellin_crecimiento_ytd: {
        type: Sequelize.STRING
    },
    sellin_tipo: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_01: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_02: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_03: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_04: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_05: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_06: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_01_tit: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_02_tit: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_03_tit: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_04_tit: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_05_tit: {
        type: Sequelize.STRING
    },
    sellin_mes_ant_06_tit: {
        type: Sequelize.STRING
    },
    sellin_crecimiento_ytd: {
        type: Sequelize.STRING
    }
}, {
    // freezeTableName: true,
    tableName: 'dashboard_sellin',
    timestamps: false
});

export default DashboardSellin