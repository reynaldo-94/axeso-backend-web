import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Sellout = sequelize.define('sellout', {
    almacenid: {
        type: Sequelize.STRING
    },
    almacen: {
        type: Sequelize.STRING
    },
    zonaid: {
        type: Sequelize.STRING
    },
    clienteid: {
        type: Sequelize.STRING
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    nombrecomercial: {
        type: Sequelize.STRING
    },
    departamento: {
        type: Sequelize.STRING
    },
    provincia: {
        type: Sequelize.STRING
    },
    distrito: {
        type: Sequelize.STRING
    },
    uni: {
        type: Sequelize.FLOAT
    },
    subcanalid: {
        type: Sequelize.STRING
    },
    subcanal: {
        type: Sequelize.STRING
    },
    vendedorid: {
        type: Sequelize.INTEGER
    },
    vendedor: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default Sellout;