import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 2 min

export async function jobDeudaPendiente() {
    console.log('Executing load data Deuda Pendiente')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_deuda_pendiente('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Deuda Pendiente', data)
    } catch (e) {
        console.log('Error Deuda Pendiente', e)
    }
    
    console.log('Done Deuda Pendiente')

}