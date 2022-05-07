import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 2 min

export async function jobComprasIngresos() {
    console.log('Executing load data Compras Ingresos')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Compras Ingresos', data)
    } catch (e) {
        console.log('Error Compras Ingresos', e)
    }
    
    console.log('Done Compras Ingresos')

}