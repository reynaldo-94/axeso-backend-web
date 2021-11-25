import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
// import Usuario from './usuario.model';
const Rolsubmenu = sequelize.define('rolsubmenu', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    rolid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreingKey: true,
        references: {
            model: 'Rol',
            key: 'rolid'
        }
    },
    submenuid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreingKey: true,
        references: {
            model: 'Submenu',
            key: 'submenuid'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Motivobloqueo.hasMany(Usuario, { foreignKey: 'motivobloqueoid' });
// Usuario.belongsTo(Motivobloqueo, { foreignKey: 'motivobloqueoid' });

export default Rolsubmenu;