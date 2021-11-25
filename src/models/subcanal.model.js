import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
// import Cliente from './cliente.model';
const Subcanal = sequelize.define('subcanal', {
    id: {
        type: Sequelize.INTEGER
    },
    subcanalid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    canalid: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    activo: {
        type: Sequelize.BOOLEAN
    },
    parazona: {
        type: Sequelize.BOOLEAN
    },
    paracliente: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// Subcanal.hasMany(Cliente, { foreignKey: 'subcanalid' });
// Cliente.belongsTo(Subcanal, { foreignKey: 'subcanalid' });

export default Subcanal;