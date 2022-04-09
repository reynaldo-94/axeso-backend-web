import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Factura = sequelize.define('factura', {
    idcta: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    iddocumento: {
        type: Sequelize.STRING,
    },
    cserie: {
        type: Sequelize.STRING
    },
    cnumero: {
        type: Sequelize.STRING
    },
    dfecemi: {
        type: Sequelize.DATE
    },
    dfeclleg: {
        type: Sequelize.DATE
    },
    dfecven: {
        type: Sequelize.DATE
    },
    dfeccan: {
        type: Sequelize.DATE
    },
    nprevens: {
        type: Sequelize.FLOAT
    },
    nacuenta: {
        type: Sequelize.FLOAT
    },
    nnotabo: {
        type: Sequelize.FLOAT
    },
    nsaldo: {
        type: Sequelize.FLOAT
    },
    idproveedor: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Factura;