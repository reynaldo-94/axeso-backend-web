import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Cartera = sequelize.define('cartera', {
    clienteid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    zonaid: {
        type: Sequelize.STRING,
    },
    lineanormal: {
        type: Sequelize.FLOAT
    },
    lineaespecial: {
        type: Sequelize.FLOAT
    },
    lineatotal: {
        type: Sequelize.FLOAT
    },
    lineadisponible: {
        type: Sequelize.FLOAT
    },
    deuda: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Cartera;