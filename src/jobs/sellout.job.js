import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 8 min - 10 min

export async function jobSellout() {
    console.log('Executing load data sellout')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_sellout('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data', data)
    } catch (e) {
        console.log('Error', e)
    }
    
    console.log('Done')

}