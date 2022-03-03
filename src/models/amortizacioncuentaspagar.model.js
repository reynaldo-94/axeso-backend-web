import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const AmortizacionCuentasPagar = sequelize.define('amortizacioncuentaspagar', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idcta: {
        type: Sequelize.INTEGER
    },
    dfecmov: {
        type: Sequelize.DATE
    },
    idmoneda: {
        type: Sequelize.STRING
    },
    nimporte: {
        type: Sequelize.FLOAT
    },
    idusuario: {
        type: Sequelize.INTEGER
    },
    idtipo: {
        type: Sequelize.STRING
    },
    idbanco: {
        type: Sequelize.STRING
    },
    creferencia: {
        type: Sequelize.STRING
    },
    idnotabo: {
        type: Sequelize.INTEGER
    },
    idcheque: {
        type: Sequelize.INTEGER
    },
    idletra: {
        type: Sequelize.INTEGER
    },
    iddocumento: {
        type: Sequelize.STRING
    },
    idperiodo: {
        type: Sequelize.INTEGER
    },
    idliquidacion: {
        type: Sequelize.INTEGER
    },
    idnotcar: {
        type: Sequelize.INTEGER
    },
    banulado: {
        type: Sequelize.BOOLEAN
    },
    norden: {
        type: Sequelize.INTEGER
    },
    idpagomasivo: {
        type: Sequelize.INTEGER
    },
    cobservacion: {
        type: Sequelize.STRING
    },
    nordencontable: {
        type: Sequelize.INTEGER
    },
    crucpro: {
        type: Sequelize.STRING
    },
    cnompro: {
        type: Sequelize.STRING
    },
    iddetalle: {
        type: Sequelize.INTEGER
    },
    ninteres: {
        type: Sequelize.FLOAT
    },
    ndcambio: {
        type: Sequelize.FLOAT
    },
    idhoja: {
        type: Sequelize.STRING
    },
    nimportes: {
        type: Sequelize.FLOAT
    },
    ntcambio: {
        type: Sequelize.FLOAT
    },
    idpago: {
        type: Sequelize.INTEGER
    },
    cmarca: {
        type: Sequelize.STRING
    },
    bconciliado: {
        type: Sequelize.BOOLEAN
    },
    idretencion: {
        type: Sequelize.INTEGER
    },
    bemision: {
        type: Sequelize.BOOLEAN
    },
    norigen: {
        type: Sequelize.FLOAT
    },
    iddetraccion: {
        type: Sequelize.INTEGER
    },
    bpdetraccion: {
        type: Sequelize.BOOLEAN
    },
    cnomtipo: {
        type: Sequelize.STRING
    },
    cnombanco: {
        type: Sequelize.STRING
    },
    ccuenta: {
        type: Sequelize.STRING
    },
    cnommoneda: {
        type: Sequelize.STRING
    },
    serie: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.STRING
    },
    documento: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default AmortizacionCuentasPagar;