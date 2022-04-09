import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const DashboardDeudaPendiente = sequelize.define('dashboard_deudapendiente', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
    },
    deudapendiente_cantidad: {
        type: Sequelize.FLOAT
    },
    deudapendiente_corriente: {
        type: Sequelize.INTEGER
    },
    deudapendiente_nocorriente: {
        type: Sequelize.INTEGER
    },
    
}, {
    freezeTableName: true,
    timestamps: false
});

export default DashboardDeudaPendiente