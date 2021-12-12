import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Selloutclientezona = sequelize.define('selloutclientezona', {
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
    divison: {
        type: Sequelize.STRING
    },
    canal: {
        type: Sequelize.STRING
    },
    cuota: {
        type: Sequelize.FLOAT
    },
    venta: {
        type: Sequelize.FLOAT
    },
    cumplimiento: {
        type: Sequelize.FLOAT
    },
    cobertura: {
        type: Sequelize.FLOAT
    },
    cartera: {
        type: Sequelize.FLOAT
    },
    pedidos: {
        type: Sequelize.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default Selloutclientezona;