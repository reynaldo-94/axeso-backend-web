import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
//rolid, nombre, submenuid, menuid
const Rolmenusubmenu = sequelize.define('rolmenusubmenu', {
    rolid: {
        type: Sequelize.INTEGER,
    },
    nombre: {
        type: Sequelize.STRING
    },
    submenuid: {
        type: Sequelize.INTEGER
    },
    menuid: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default Rolmenusubmenu;