import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {
        
        console.log('Executing load data Sellout Periodo Enero 2023')
        const dataSellout_01 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual('481','01')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Enero 2023', dataSellout_01)

        console.log('Executing load data Sellout Periodo Febrero 2023')
        const dataSellout_02 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual('482','02')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Febrero 2023', dataSellout_02)

        console.log('Executing load data Sellout Periodo Marzo 2023')
        const dataSellout_03 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual('483','03')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Marzo 2023', dataSellout_03)

        console.log('Executing delete Dashboard Sellout Cobertura')
        const deleteSellCob = await sequelize.query(
            `delete from axeso.dashboard_sellout_cobertura`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Sellout Cobertura', deleteSellCob)

        console.log('Executing delete Dashboard Inventario')
        const deleteInv = await sequelize.query(
            `delete from axeso.dashboard_inventario`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Inventario', deleteInv)

        console.log('Executing delete Dashboard Deuda Pendiente')
        const deleteDeudPend = await sequelize.query(
            `delete from axeso.dashboard_deudapendiente`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Deuda Pendiente', deleteDeudPend)

        console.log('Executing delete Dashboard SellIn')
        const deleteSellin = await sequelize.query(
            `delete from axeso.dashboard_sellin`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard SellIn', deleteSellin)

        console.log('Executing delete Dashboard SellIn Sellout Mensual')
        const deleteSellinout = await sequelize.query(
            `delete from axeso.dashboard_sellin_sellout_mensual`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard SellIn Sellout Mensual', deleteSellinout)
        
        
        
        // console.log('Executing load data Sellout Periodo Actual')
        // const dataSellout = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout Periodo Actual', dataSellout)
        
        console.log('Executing load data Compras Periodo Actual')
        const dataCompras = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Actual', dataCompras)

        console.log('Executing load data Deuda Pendiente')
        const dataDeudaPend = await sequelize.query(
            `select * from axeso.fn_cargar_deuda_pendiente(null)`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Deuda Pendiente', dataDeudaPend)        

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
function querySellout(firstTable, secondTable) {
    const selloutColumns = `
    idperiodo, 
    idaño, 
    idmes, 
    idproducto, 
    idsublinea, 
    idlinea, 
    idproveedor, 
    idalmacen, 
    idcliente, 
    distrito, 
    provincia, 
    departamento, 
    idcanal, 
    idsubcanal, 
    iddivision, 
    idzona, 
    idvendedor, 
    idsupervisor, 
    idunineg, 
    cantidad, 
    total, 
    costoventa`;
    const query = `
        insert into axeso.${firstTable} (${selloutColumns})
        SELECT ${selloutColumns} FROM axeso.${secondTable};
        `;
    return query;
}
export async function jobsSelloutAnteriorToSelloutTodos() {
    console.time("jobsSelloutAnteriorToSelloutTodos");
    try {
        // 1.- mover los datos de la tabla sellout_anterior a la tabla todos;
        const query = querySellout('sellout_todos', 'sellout_anterior');
        await sequelize.query(query, { type: Sequelize.QueryTypes.INSERT, });
        // 2.- eliminar los datos de la tabla  sellout_anterior;
        await sequelize.query(`TRUNCATE axeso.sellout_anterior; `, { type: Sequelize.QueryTypes.DELETE, });

    } catch (error) {
        console.log(error);
    }
    console.timeEnd("jobsSelloutAnteriorToSelloutTodos")

}
export async function jobsSelloutToSelloutAnterior() {
    console.time("jobsSelloutToSelloutAnterior");
    try {
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        for (let i = 0; i < months.length; i++) {
            console.time(months[i]);

            const query = querySellout('sellout_anterior', `sellout_${months[i]}`);
            // 1.- insertar los datos de las tablas sellout_01,..., sellout_12 en la tabla sellout_anterior;
            await sequelize.query(query, { type: Sequelize.QueryTypes.INSERT, });
            // 2.- eliminar los datos de las tablas sellout_01,..., sellout_12
            await sequelize.query(`TRUNCATE axeso.sellout_${months[i]}; `, { type: Sequelize.QueryTypes.DELETE, });
            console.timeEnd(months[i]);
        }

    } catch (error) {
        console.log(error);
    }
    console.timeEnd("jobsSelloutToSelloutAnterior")

}

export async function jobSelloutMesAnterior() {
    console.log('Executing Jobs')
    try {
        // Cargar el sellout anterior y todo el dashboard
        console.log('Executing load data Sellout Periodo Anterior')
        const dataSelloutAnt = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_anterior()`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Anterior', dataSelloutAnt)

        // Cargar dashboard completo
        console.log('Executing delete Dashboard Sellout Cobertura')
        const deleteSellCob = await sequelize.query(
            `delete from axeso.dashboard_sellout_cobertura`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Sellout Cobertura', deleteSellCob)

        console.log('Executing delete Dashboard Inventario')
        const deleteInv = await sequelize.query(
            `delete from axeso.dashboard_inventario`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Inventario', deleteInv)

        console.log('Executing delete Dashboard Deuda Pendiente')
        const deleteDeudPend = await sequelize.query(
            `delete from axeso.dashboard_deudapendiente`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard Deuda Pendiente', deleteDeudPend)

        console.log('Executing delete Dashboard SellIn')
        const deleteSellin = await sequelize.query(
            `delete from axeso.dashboard_sellin`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard SellIn', deleteSellin)

        console.log('Executing delete Dashboard SellIn Sellout Mensual')
        const deleteSellinout = await sequelize.query(
            `delete from axeso.dashboard_sellin_sellout_mensual`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job delete Dashboard SellIn Sellout Mensual', deleteSellinout)
        
        console.log('Executing load data Sellout Periodo Actual')
        const dataSellout = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Actual', dataSellout)

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