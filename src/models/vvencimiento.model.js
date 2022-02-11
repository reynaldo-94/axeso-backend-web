import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Vvencimiento = sequelize.define('vvencimiento', {
    vencimientoid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    desde: {
        type: Sequelize.INTEGER,
    },
    hasta: {
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Vvencimiento;