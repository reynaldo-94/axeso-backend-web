import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 9 min

export async function jobs() {
    console.log('Executing Jobs')
    try {
        console.log('Executing load data Sellout')
        const dataSellout = await sequelize.query(
            `select * from axeso.fn_cargar_sellout(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout', dataSellout)

        console.log('Executing load data SellIn')
        const dataCompras = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellin', dataCompras)

        console.log('Executing load data Deuda Pendiente')
        const dataDeudaPend = await sequelize.query(
            `select * from axeso.fn_cargar_deuda_pendiente(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Deuda Pendiente', dataDeudaPend)

        console.log('Executing load data Detalle Ventas')
        const dataDetalleVent = await sequelize.query(
            `select * from axeso.fn_cargar_detalle_ventas(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Detalle Ventas', dataDetalleVent)

        console.log('Executing load data Antiguedad Inventario')
        const dataAntigInv = await sequelize.query(
            `select * from axeso.fn_cargar_antiguedad_inventario(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Antiguedad Inventario', dataAntigInv)

        console.log('Executing load data Dashboard')
        const dataDashboard = await sequelize.query(
            `select * from axeso.fn_cargar_dashboard(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Dashboard', dataDashboard)
        
        await sequelize.query(
            `INSERT INTO axeso.jobs_detalle(fecha_registro) VALUES (now() - interval '10 hour')`,
            { type: Sequelize.QueryTypes.INSERT }
        );
        console.log('Insert en la tabla jobs_detalle');
    } catch (e) {
        console.log('Error in Jobs', e)
    }
    
    console.log('Done Jobs')

}