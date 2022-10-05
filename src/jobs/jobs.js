import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {

        console.log('Executing load data Sellout Periodo Enero')
        const dataSellout1 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(461,'01')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Enero', dataSellout1)

        console.log('Executing load data Sellout Periodo Febrero')
        const dataSellout2 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(462,'02')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Febrero', dataSellout2)

        console.log('Executing load data Sellout Periodo Marzo')
        const dataSellout3 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(463,'03')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Marzo', dataSellout3)

        console.log('Executing load data Sellout Periodo Abril')
        const dataSellout4 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(464,'04')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Abril', dataSellout4)

        console.log('Executing load data Sellout Periodo Mayo')
        const dataSellout5 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(465,'05')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Mayo', dataSellout5)

        console.log('Executing load data Sellout Periodo Junio')
        const dataSellout6 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(466,'06')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Junio', dataSellout6)

        console.log('Executing load data Sellout Periodo Julio')
        const dataSellout7 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(467,'07')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Julio', dataSellout7)

        console.log('Executing load data Sellout Periodo Agosto')
        const dataSellout8 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(468,'08')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Agosto', dataSellout8)

        console.log('Executing load data Sellout Periodo Setiembre')
        const dataSellout9 = await sequelize.query(
            `select * from axeso.fn_cargar_sellout_por_periodo_actual(469,'09')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Setiembre', dataSellout9)

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