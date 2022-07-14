import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const SelloutAnterior = sequelize.define('sellout_anterior', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idperiodo: {
        type: Sequelize.INTEGER
    },
    idaño: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default SelloutAnterior;