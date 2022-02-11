import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './usuario_web.model';
const Tipousuario = sequelize.define('tipousuario', {
    tipousuarioid: {
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


Tipousuario.hasMany(Usuario, { foreignKey: 'tipousuarioid' });
Usuario.belongsTo(Tipousuario, { foreignKey: 'tipousuarioid' });

export default Tipousuario;