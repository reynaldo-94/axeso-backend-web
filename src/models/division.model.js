import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Division = sequelize.define('division', {
    divisionid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});
export default Division;