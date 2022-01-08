/* , , , , , , , ,  */
import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Contacto_proveedor = sequelize2.define('contacto_proveedor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    proveedorid: {
        type: Sequelize.STRING,
    },
    nombre: {
        type: Sequelize.STRING
    },
    cargo: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    area: {
        type: Sequelize.STRING
    },
    celular: {
        type: Sequelize.STRING
    },
    unidadnegocioid: {
        type: Sequelize.STRING
    },
    informacionadiconal: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Contacto_proveedor;