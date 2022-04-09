import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const CuentasPagar = sequelize.define('cuentaspagar', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    serie: {
        type: Sequelize.STRING
    },
    numdocumento: {
        type: Sequelize.STRING
    },
    cnomtipodocumento: {
        type: Sequelize.STRING
    },
    nimporte: {
        type: Sequelize.FLOAT
    },
    nvalorliquidado: {
        type: Sequelize.FLOAT
    },
    nsaldo: {
        type: Sequelize.FLOAT
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default CuentasPagar;