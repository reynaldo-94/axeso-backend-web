import Sequelize from 'sequelize';
import { sequelize } from '../database/database-bi';

const Inventario = sequelize.define("inventario", {
    idproducto: {
        type: Sequelize.STRING
    },
    idalmacen: {
        type: Sequelize.INTEGER
    },
    categoria: {
        type: Sequelize.STRING
    },    
}, {
    tableName: 'inventario',
    timestamps: false,
    freezeTableName: true
});

export default Inventario;