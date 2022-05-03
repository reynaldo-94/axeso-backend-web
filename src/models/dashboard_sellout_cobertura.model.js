import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const DashboardSelloutCobertura = sequelize.define('dashboard_sellout_cobertura', {
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
    sellout_ventaxmes: {
        type: Sequelize.FLOAT
    },
    sellout_cumplimiento: {
        type: Sequelize.INTEGER
    },
    sellout_crecimiento_ytd: {
        type: Sequelize.STRING
    },
    sellout_tipo: {
        type: Sequelize.STRING
    },
    cobertura_clientexmes: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_01: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_02: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_03: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_04: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_05: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_06: {
        type: Sequelize.INTEGER
    },
    cobertura_mes_ant_01_tit: {
        type: Sequelize.STRING
    },
    cobertura_mes_ant_02_tit: {
        type: Sequelize.STRING
    },
    cobertura_mes_ant_03_tit: {
        type: Sequelize.STRING
    },
    cobertura_mes_ant_04_tit: {
        type: Sequelize.STRING
    },
    cobertura_mes_ant_05_tit: {
        type: Sequelize.STRING
    },
    cobertura_mes_ant_06_tit: {
        type: Sequelize.STRING
    },
    cobertura_crecimiento_ytd: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    // tableName: 'dashboard_sellout_cobertura',
    timestamps: false
});

export default DashboardSelloutCobertura