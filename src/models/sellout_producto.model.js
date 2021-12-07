import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Sellout_producto = sequelize.define('sellout_producto', {
    productoid: {
        type: Sequelize.STRING
    },
    producto: {
        type: Sequelize.STRING
    },
    unidad: {
        type: Sequelize.STRING
    },
    enero: {
        type: Sequelize.FLOAT
    },
    febrero: {
        type: Sequelize.FLOAT
    },
    marzo: {
        type: Sequelize.FLOAT
    },
    abril: {
        type: Sequelize.FLOAT
    },
    mayo: {
        type: Sequelize.FLOAT
    },
    junio: {
        type: Sequelize.FLOAT
    },
    julio: {
        type: Sequelize.FLOAT
    },
    agosto: {
        type: Sequelize.FLOAT
    },
    setiembre: {
        type: Sequelize.FLOAT
    },
    octubre: {
        type: Sequelize.FLOAT
    },
    noviembre: {
        type: Sequelize.FLOAT
    },
    diciembre: {
        type: Sequelize.FLOAT
    },
    total: {
        type: Sequelize.FLOAT
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default Sellout_producto;