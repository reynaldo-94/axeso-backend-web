import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Selloutmes = sequelize.define('selloutmes', {
    clienteid: {
        type: Sequelize.STRING
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    nombrecomercial: {
        type: Sequelize.STRING
    },
    ene: {
        type: Sequelize.FLOAT
    },
    feb: {
        type: Sequelize.FLOAT
    },
    mar: {
        type: Sequelize.FLOAT
    },
    abr: {
        type: Sequelize.FLOAT
    },
    may: {
        type: Sequelize.FLOAT
    },
    jun: {
        type: Sequelize.FLOAT
    },
    jul: {
        type: Sequelize.FLOAT
    },
    ago: {
        type: Sequelize.FLOAT
    },
    sep: {
        type: Sequelize.FLOAT
    },
    oct: {
        type: Sequelize.FLOAT
    },
    nov: {
        type: Sequelize.FLOAT
    },
    dic: {
        type: Sequelize.FLOAT
    },
    total: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default Selloutmes;