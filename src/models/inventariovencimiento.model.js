import Sequelize from 'sequelize';
import { sequelize2 } from '../database/database';
const Inventariovencimiento = sequelize2.define('inventariovencimiento', {
    sede: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    almacen: {
        type: Sequelize.INTEGER,
    },
    vencido: {
        type: Sequelize.FLOAT
    },
    d00_03: {
        type: Sequelize.FLOAT
    },
    d03_06: {
        type: Sequelize.FLOAT
    },
    d06_12: {
        type: Sequelize.FLOAT
    },
    mas_12: {
        type: Sequelize.FLOAT
    },
    total: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Inventariovencimiento;