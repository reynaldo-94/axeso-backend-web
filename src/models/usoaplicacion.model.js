import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
// import Cliente from './cliente.model';
const Usoaplicacion = sequelize.define('usoaplicacion', {
    usoaplicacionid: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Usuario',
            key: 'usuarioid'
        }
    },
    submenuid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Submenu',
            key: 'submenuid'
        }
    },
    fechahora: {
        type: Sequelize.TIME
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Ubigeo.hasMany(Cliente, { foreignKey: 'ubigeoid' });
// Cliente.belongsTo(Ubigeo, { foreignKey: 'ubigeoid' });

export default Usoaplicacion;