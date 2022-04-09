import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const DeudaPendienteResumen = sequelize.define('deuda_pendiente_resumen', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    periodo: {
        type: Sequelize.STRING,
    },
    monto_logistico: {
        type: Sequelize.DECIMAL
    },
    monto_comercial: {
        type: Sequelize.DECIMAL
    },
    monto_factura: {
        type: Sequelize.DECIMAL
    },
    total: {
        type: Sequelize.DECIMAL
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DeudaPendienteResumen;