import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

// Demora aprox 9 min

export async function jobDashboard() {
    console.log('Executing load data Sellout - Compras - DeudaPendiente - Dashboard')
    try {
        const dataSellout = await sequelize.query(
            `select * from axeso.fn_cargar_sellout(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Sellout', dataSellout)
        const dataCompras = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Compras', dataCompras)
        const dataDeudaPend = await sequelize.query(
            `select * from axeso.fn_cargar_deuda_pendiente(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Deuda Pendiente', dataDeudaPend)
        const dataDashboard = await sequelize.query(
            `select * from axeso.fn_cargar_dashboard(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Data Dashboard', dataDashboard)
    } catch (e) {
        console.log('Error Sellout - Compras - DeudaPendiente - Dashboard', e)
    }
    
    console.log('Done Sellout - Compras - DeudaPendiente - Dashboard')

}