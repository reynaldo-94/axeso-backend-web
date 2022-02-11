import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario_web.model';
import Menu from './menu.model';

const Usuariomenu = sequelize.define('usuariomenu', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Usuario',
            key: 'usuarioid'
        }
    },
    menuid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Menu',
            key: 'menuid'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Usuariomenu.hasMany(Usuario, { foreignKey: 'usuarioid' });
//Usuario.belongsTo(Usuariomenu, { foreignKey: 'usuarioid' });

export default Usuariomenu;