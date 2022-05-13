import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 2 min

export async function jobAntiguedadInventario() {
    console.log('Executing load data Antiguedad Inventario')
    try {
        const data = await sequelize.query(
            `select * from axeso.fn_cargar_antiguedad_inventario(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Antiguedad Inventario', data)
    } catch (e) {
        console.log('Error Antiguedad Inventario', e)
    }
    
    console.log('Done Antiguedad Inventario')

}