import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Periodo = sequelize.define('periodo', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    desde: {
        type: Sequelize.STRING,

    },
    hasta: {
        type: Sequelize.STRING
    },
    anoid: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Periodo;