import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Inventarioporvencimiento = sequelize.define('inventarioporvencimiento', {
    almacenid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    almacen: {
        type: Sequelize.STRING,
    },
    lineaid: {
        type: Sequelize.STRING
    },
    linea: {
        type: Sequelize.STRING
    },
    productoid: {
        type: Sequelize.STRING
    },
    producto: {
        type: Sequelize.STRING
    },
    estadoproducto: {
        type: Sequelize.STRING
    },
    estadoexistencia: {
        type: Sequelize.STRING
    },
    unidadmedida: {
        type: Sequelize.STRING
    },
    lote: {
        type: Sequelize.STRING
    },
    vencimiento: {
        type: Sequelize.DATE
    },
    stock: {
        type: Sequelize.FLOAT
    },
    costounitario: {
        type: Sequelize.FLOAT
    },
    diasstock: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Inventarioporvencimiento;