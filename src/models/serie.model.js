import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Serie = sequelize.define('serie', {
    serie: {
        type: Sequelize.STRING,
        primaryKey: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default Serie;