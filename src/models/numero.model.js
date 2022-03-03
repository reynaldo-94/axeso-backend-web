import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Numero = sequelize.define('numero', {
    numero: {
        type: Sequelize.STRING,
        primaryKey: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default Numero;