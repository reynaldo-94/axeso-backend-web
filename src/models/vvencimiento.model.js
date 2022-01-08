import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Vvencimiento = sequelize2.define('vvencimiento', {
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