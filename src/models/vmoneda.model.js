import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Moneda = sequelize.define('vmoneda', {
    idmoneda: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    cnommoneda: {
        type: Sequelize.STRING
    },
    btipocambio: {
        type: Sequelize.BOOLEAN
    },
    cabrev: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Moneda;