import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Contacto = sequelize2.define('contacto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cnombre: {
        type: Sequelize.STRING,
    },
    capellidos: {
        type: Sequelize.STRING
    },
    ccargo: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    idunineg: {
        type: Sequelize.STRING
    },
    idhistorico: {
        type: Sequelize.INTEGER
    },
    cnumero: {
        type: Sequelize.STRING
    },
    cnomuni: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Contacto;