import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Cliente from './cliente.model';
const Vunidadnegocio = sequelize.define('vunidadnegocio', {
    unidadnegocioid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    empresaid: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    abreviatura: {
        type: Sequelize.STRING
    },
    ciudad: {
        type: Sequelize.STRING
    },
    activo: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});
Vunidadnegocio.hasMany(Cliente, { foreignKey: 'unidadnegocioid' });
Cliente.belongsTo(Vunidadnegocio, { foreignKey: 'unidadnegocioid' });
export default Vunidadnegocio;