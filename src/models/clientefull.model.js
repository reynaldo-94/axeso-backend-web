import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Clientefull = sequelize.define('clientefull', {
    clienteid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ruc: {
        type: Sequelize.STRING,
    },
    razonsocial: {
        type: Sequelize.STRING
    },
    nombrecomercial: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    ubigeoid: {
        type: Sequelize.STRING
    },
    distrito: {
        type: Sequelize.INTEGER
    },
    provincia: {
        type: Sequelize.STRING
    },
    departamento: {
        type: Sequelize.STRING
    },
    estadoclienteid: {
        type: Sequelize.STRING
    },
    estadocliente: {
        type: Sequelize.STRING
    },
    estadodiremidid: {
        type: Sequelize.STRING
    },
    estadodiremid: {
        type: Sequelize.STRING
    },
    sedeid: {
        type: Sequelize.STRING
    },
    sede: {
        type: Sequelize.STRING
    },
    zonaid: {
        type: Sequelize.STRING
    },
    zonaid_2: {
        type: Sequelize.STRING
    },
    zonaid_3: {
        type: Sequelize.STRING
    },
    zonaid_4: {
        type: Sequelize.STRING
    },
    vendedorid: {
        type: Sequelize.STRING
    },
    vendedor: {
        type: Sequelize.STRING
    },
    subcanalid: {
        type: Sequelize.STRING
    },
    subcanal: {
        type: Sequelize.STRING
    },
    canalid: {
        type: Sequelize.STRING
    },
    canal: {
        type: Sequelize.STRING
    },
    condicionventaid: {
        type: Sequelize.STRING
    },
    condicionventa: {
        type: Sequelize.STRING
    },
    tipodescuentoid: {
        type: Sequelize.STRING
    },
    tipodescuento: {
        type: Sequelize.STRING
    },
    dia1: {
        type: Sequelize.STRING
    },
    dia2: {
        type: Sequelize.STRING
    },
    representantelegal: {
        type: Sequelize.STRING
    },
    dni: {
        type: Sequelize.STRING
    },
    aniversario: {
        type: Sequelize.DATE
    },
    telefono: {
        type: Sequelize.STRING
    },
    movil: {
        type: Sequelize.STRING
    },
    lineanormal: {
        type: Sequelize.FLOAT
    },
    lineaespecial: {
        type: Sequelize.FLOAT
    },
    lineatotal: {
        type: Sequelize.FLOAT
    },
    lineadisponible: {
        type: Sequelize.FLOAT
    },
    deuda: {
        type: Sequelize.FLOAT
    },
    bfarma: {
        type: Sequelize.BOOLEAN,
      },
      bprovincia: {
        type: Sequelize.BOOLEAN,
      },
      divisionid: {
        type: Sequelize.STRING,
      },
      division: {
        type: Sequelize.STRING,
      },
}, {
    freezeTableName: true,
    timestamps: false
});

export default Clientefull;