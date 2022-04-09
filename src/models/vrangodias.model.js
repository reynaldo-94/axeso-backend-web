import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const RangoDias = sequelize.define('vrangodias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default RangoDias;