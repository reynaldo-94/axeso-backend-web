import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Cliente from './cliente.model';
const Ubigeo = sequelize.define('vubigeo', {
    ubigeoid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    departamentoid: {
        type: Sequelize.STRING
    },
    provinciaid: {
        type: Sequelize.STRING
    },
    distritoid: {
        type: Sequelize.STRING
    },
    departamento: {
        type: Sequelize.STRING
    },
    provincia: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});


Ubigeo.hasMany(Cliente, { foreignKey: 'ubigeoid' });
Cliente.belongsTo(Ubigeo, { foreignKey: 'ubigeoid' });

export default Ubigeo;