import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Documento = sequelize.define('documento', {
    idcta: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idnotabo: {
        type: Sequelize.INTEGER
    },
    idnotcar: {
        type: Sequelize.INTEGER
    },

    idletra: {
        type: Sequelize.INTEGER
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
    npreven: {
        type: Sequelize.FLOAT
    },
    nimporte: {
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
    },
    idmoneda: {
        type: Sequelize.STRING
    },
    moneda: {
        type: Sequelize.STRING
    },
    idunineg: {
        type: Sequelize.STRING
    },
    sede: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Documento;