import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 2 min

export async function jobComprasIngresos() {
    console.log('Executing load data compras ingresos')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data', data)
    } catch (e) {
        console.log('Error', e)
    }
    
    console.log('Done')

}