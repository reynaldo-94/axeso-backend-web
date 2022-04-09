import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const MotivoReclamo = sequelize.define('vmotivo_reclamo', {
    idmotivo: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    cnommotivo: {
        type: Sequelize.STRING
    },
    cglosa: {
        type: Sequelize.STRING
    },
    cdespido: {
        type: Sequelize.STRING
    },
    bfactura: {
        type: Sequelize.BOOLEAN
    },
    bcompras: {
        type: Sequelize.BOOLEAN
    },
    idrubro: {
        type: Sequelize.INTEGER,
        // foreingKey: true,
        // references: {
        //     model: 'VProveedor',
        //     key: 'proveedorid'
        // }
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default MotivoReclamo;