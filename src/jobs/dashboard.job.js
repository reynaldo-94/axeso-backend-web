import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 9 min

export async function jobDashboard() {
    console.log('Executing load data Dashboard')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_dashboard('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Dashboard', data)
    } catch (e) {
        console.log('Error Dashboard', e)
    }
    
    console.log('Done Dashboard')

}