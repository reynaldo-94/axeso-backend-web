import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 2 min

export async function jobDetalleVentas() {
    console.log('Executing load data Detalle Ventas')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_detalle_ventas('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Detalle Ventas', data)
    } catch (e) {
        console.log('Error Detalle Ventas', e)
    }
    
    console.log('Done Detalle Ventas')

}