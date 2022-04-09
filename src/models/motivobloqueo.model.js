import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario_web.model';
const Motivobloqueo = sequelize.define('motivobloqueo', {
    motivobloqueoid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Motivobloqueo.hasMany(Usuario, { foreignKey: 'motivobloqueoid' });
Usuario.belongsTo(Motivobloqueo, { foreignKey: 'motivobloqueoid' });

export default Motivobloqueo;