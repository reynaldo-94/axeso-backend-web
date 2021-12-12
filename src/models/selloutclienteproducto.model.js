import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Selloutclienteproducto = sequelize.define('selloutclienteproducto', {
    sede: {
        type: Sequelize.STRING
    },
    zonaid: {
        type: Sequelize.STRING
    },
    vendedor: {
        type: Sequelize.STRING
    },
    supervisor: {
        type: Sequelize.STRING
    },
    año: {
        type: Sequelize.STRING
    },
    mes: {
        type: Sequelize.STRING
    },
    clienteid: {
        type: Sequelize.STRING
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    combrecomercial: {
        type: Sequelize.STRING
    },
    canal: {
        type: Sequelize.STRING
    },
    subcanal: {
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
    productoid: {
        type: Sequelize.STRING
    },
    producto: {
        type: Sequelize.STRING
    },
    cantidad: {
        type: Sequelize.FLOAT
    },
    venta: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default Selloutclienteproducto;