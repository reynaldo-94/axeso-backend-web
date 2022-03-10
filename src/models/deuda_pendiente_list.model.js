import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const DeudaPendienteList = sequelize.define('deuda_pendiente_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    numero: {
        type: Sequelize.STRING,
    },
    idunineg: {
        type: Sequelize.STRING,
    },
    idproveedor: {
        type: Sequelize.STRING,
    },
    idmotivo: {
        type: Sequelize.STRING,
    },
    fecha: {
        type: Sequelize.DATE,
    },
    importe: {
        type: Sequelize.DECIMAL
    },
    acuenta: {
        type: Sequelize.DECIMAL
    },
    saldo: {
        type: Sequelize.DECIMAL
    },
    glosa: {
        type: Sequelize.STRING,
    },
    fecregistro: {
        type: Sequelize.DATE,
    },
    docreferencia: {
        type: Sequelize.STRING,
    },
    idperiodo: {
        type: Sequelize.INTEGER
    },
    motivo: {
        type: Sequelize.STRING
    },
    rubro: {
        type: Sequelize.STRING
    },
    anio: {
        type: Sequelize.STRING
    },
    mes: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DeudaPendienteList;