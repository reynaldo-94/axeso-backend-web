import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//id, usuarioid, lineaid
const Usuariolinea = sequelize.define('usuariolinea', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    usuarioid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    lineaid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Linea',
            key: 'lineaid'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});


export default Usuariolinea;