import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const TipoDocumentoEstado = sequelize.define('tipodocestado', {
    tipodocid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default TipoDocumentoEstado;