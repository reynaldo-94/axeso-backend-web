import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const JobsDetalle = sequelize.define('jobs_detalle', {    
    fecha_registro: {
        type: 'TIMESTAMP',
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default JobsDetalle;