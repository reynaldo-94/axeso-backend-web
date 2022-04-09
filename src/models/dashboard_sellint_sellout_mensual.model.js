import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const DashboardSellinSelloutMensual = sequelize.define('dashboard_sellin_sellout_mensual', {
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
    sellin_mes_ant_07: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_08: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_09: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_10: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_11: {
        type: Sequelize.FLOAT
    },
    sellin_mes_ant_12: {
        type: Sequelize.FLOAT
    },

    sellout_mes_ant_01: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_02: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_03: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_04: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_05: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_06: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_07: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_08: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_09: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_10: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_11: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant_12: {
        type: Sequelize.FLOAT
    },    
    
    mes_ant_01_tit: {
        type: Sequelize.STRING
    },
    mes_ant_02_tit: {
        type: Sequelize.STRING
    },
    mes_ant_03_tit: {
        type: Sequelize.STRING
    },
    mes_ant_04_tit: {
        type: Sequelize.STRING
    },
    mes_ant_05_tit: {
        type: Sequelize.STRING
    },
    mes_ant_06_tit: {
        type: Sequelize.STRING
    },
    mes_ant_07_tit: {
        type: Sequelize.STRING
    },
    mes_ant_08_tit: {
        type: Sequelize.STRING
    },
    mes_ant_09_tit: {
        type: Sequelize.STRING
    },
    mes_ant_10_tit: {
        type: Sequelize.STRING
    },
    mes_ant_11_tit: {
        type: Sequelize.STRING
    },
    mes_ant_12_tit: {
        type: Sequelize.STRING
    },
    
}, {
    // freezeTableName: true,
    tableName: 'dashboard_sellin_sellout_mensual',
    timestamps: false
});

export default DashboardSellinSelloutMensual