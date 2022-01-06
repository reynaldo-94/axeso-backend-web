import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Stockproducto = sequelize2.define('stockproducto', {
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
    sublineaid: {
        type: Sequelize.STRING
    },
    sublinea: {
        type: Sequelize.STRING
    },
    productoid: {
        type: Sequelize.STRING
    },
    productoid_prov: {
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
    masterpack: {
        type: Sequelize.INTEGER
    },
    costounitario: {
        type: Sequelize.FLOAT
    },
    stock: {
        type: Sequelize.FLOAT
    },
    diasstock: {
        type: Sequelize.FLOAT
    },
    selloutpromedio: {
        type: Sequelize.FLOAT
    },
    octransito: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Stockproducto;