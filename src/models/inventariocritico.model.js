import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Inventariocritico = sequelize2.define('inventariocritico', {
    almacen: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    productoid: {
        type: Sequelize.STRING,
    },
    producto: {
        type: Sequelize.STRING
    },
    productoid_prov: {
        type: Sequelize.STRING
    },
    sublinea: {
        type: Sequelize.STRING
    },
    ultima_fec_ing: {
        type: Sequelize.DATE
    },
    estadoproducto: {
        type: Sequelize.STRING
    },
    estadoexistencia: {
        type: Sequelize.STRING
    },
    costounitario: {
        type: Sequelize.FLOAT
    },
    sellout_mes: {
        type: Sequelize.FLOAT
    },
    sellout_mes_ant: {
        type: Sequelize.FLOAT
    },
    selloutpromedio: {
        type: Sequelize.FLOAT
    },
    stock: {
        type: Sequelize.FLOAT
    },
    diasstock: {
        type: Sequelize.FLOAT
    },
    sobrestock_uni: {
        type: Sequelize.FLOAT
    },
    sobrestock_val: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Inventariocritico;