/*    numeric,  character varying*/

import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Stock_producto_descarga = sequelize2.define('stock_producto_descarga', {
    almacen: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    linea: {
        type: Sequelize.STRING,
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
    masterpack: {
        type: Sequelize.INTEGER
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
    stockvalorizado: {
        type: Sequelize.FLOAT
    },
    rangovencimiento: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Stock_producto_descarga;