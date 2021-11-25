import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
// import Usuario from './usuario.model';
const Sesion = sequelize.define('sesion', {
    sesionid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Usuario',
            key: 'usuarioid'
        }
    },
    inicio: {
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW
    },
    fin: {
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Motivobloqueo.hasMany(Usuario, { foreignKey: 'motivobloqueoid' });
// Usuario.belongsTo(Motivobloqueo, { foreignKey: 'motivobloqueoid' });

export default Sesion;