import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Cliente = sequelize.define("cliente", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clienteid: {
        type: Sequelize.STRING
    },
    unidadnegocioid: {
        type: Sequelize.STRING
    },
    ruc: {
        type: Sequelize.STRING
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    nombrecomercial: {
        type: Sequelize.STRING
    },
    zonaid: {
        type: Sequelize.STRING
    },
    ubigeoid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Ubigeo',
            key: 'ubigeoid'
        }
    },
    direccion: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Cliente;