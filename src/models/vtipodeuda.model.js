import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const TipoDeuda = sequelize.define('vtipodeuda', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default TipoDeuda;