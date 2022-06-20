import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const DashboardInventario = sequelize.define('dashboard_inventario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idproveedor: {
        type: Sequelize.STRING
    },
    idlinea: {
        type: Sequelize.STRING
    },
    idalmacen: {
        type: Sequelize.INTEGER
    },
    nomalmacen: {
        type: Sequelize.STRING
    },
    inventario: {
        type: Sequelize.FLOAT
    },
    sell_out_prom: {
        type: Sequelize.FLOAT
    },
    sell_out_prom_costoventa: {
        type: Sequelize.FLOAT
    },
    dias_stock: {
        type: Sequelize.FLOAT
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default DashboardInventario;