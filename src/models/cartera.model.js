import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Cartera = sequelize2.define('cartera', {
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