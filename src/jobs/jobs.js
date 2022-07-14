import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {

        console.log('Executing load Delete Data Dashboard Deuda Pendiente')
        const dataDeudPend = await sequelize.query(
            `delete from axeso.dashboard_deudapendiente`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job Delete Data Dashboard Deuda Pendiente', dataDeudPend)

        console.log('Executing load Delete Data Dashboard Inventario')
        const dataInventario = await sequelize.query(
            `delete from axeso.dashboard_inventario`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job Delete Data Dashboard Inventario', dataInventario)

        console.log('Executing load Delete Data Dashboard Sell In')
        const dataSellIn = await sequelize.query(
            `delete from axeso.dashboard_sellin`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job Delete Data Dashboard SellIn', dataSellIn)

        console.log('Executing load Delete Data Dashboard Sell In-out Mensual')
        const dataSellio = await sequelize.query(
            `delete from axeso.dashboard_sellin_sellout_mensual`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job Delete Data Dashboard Sell In-out Mensual', dataSellio)

        console.log('Executing load Delete Data Dashboard Sell Cobertura')
        const dataSelloutCob = await sequelize.query(
            `delete from axeso.dashboard_sellout_cobertura`,
            { type: Sequelize.QueryTypes.DELETE }
        );
        console.log('Done Job Delete Data Dashboard Sell Cobertura', dataSelloutCob)

        // console.log('Executing load data Sellout 1')
        // const dataSellout441 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('441')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 1 por Periodo', dataSellout441)

        // console.log('Executing load data Sellout 2')
        // const dataSellout442 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('442')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 2 por Periodo', dataSellout442)

        // console.log('Executing load data Sellout 3')
        // const dataSellout443 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('443')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 3 por Periodo', dataSellout443)

        // console.log('Executing load data Sellout 4')
        // const dataSellout444 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('444')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 4 por Periodo', dataSellout444)

        // console.log('Executing load data Sellout 5')
        // const dataSellout445 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('445')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 5 por Periodo', dataSellout445)

        // console.log('Executing load data Sellout 6')
        // const dataSellout446 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('446')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 6 por Periodo', dataSellout446)

        // console.log('Executing load data Sellout 7')
        // const dataSellout447 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('447')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 7 por Periodo', dataSellout447)

        // console.log('Executing load data Sellout 8')
        // const dataSellout448 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('448')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 8 por Periodo', dataSellout448)

        // console.log('Executing load data Sellout 9')
        // const dataSellout449 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('449')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 9 por Periodo', dataSellout449)

        // console.log('Executing load data Sellout 10')
        // const dataSellout4410 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('450')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 10 por Periodo', dataSellout4410)

        // console.log('Executing load data Sellout 11')
        // const dataSellout4411 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('451')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 11 por Periodo', dataSellout4411)

        // console.log('Executing load data Sellout 12')
        // const dataSellout4412 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_anterior('452')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout 12 por Periodo', dataSellout4412)


        // console.log('Executing load data Sellout por Periodo')
        // const dataSellout = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout por Periodo', dataSellout)

        // console.log('Executing load data SellIn')
        // const dataCompras = await sequelize.query(
        //     `select * from axeso.fn_cargar_comprasingresos(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellin', dataCompras)

        // console.log('Executing load data Deuda Pendiente')
        // const dataDeudaPend = await sequelize.query(
        //     `select * from axeso.fn_cargar_deuda_pendiente(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Deuda Pendiente', dataDeudaPend)

        // console.log('Executing load data Detalle Ventas')
        // const dataDetalleVent = await sequelize.query(
        //     `select * from axeso.fn_cargar_detalle_ventas(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Detalle Ventas', dataDetalleVent)

        // console.log('Executing load data Antiguedad Inventario')
        // const dataAntigInv = await sequelize.query(
        //     `select * from axeso.fn_cargar_antiguedad_inventario(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Antiguedad Inventario', dataAntigInv)

        // console.log('Executing load data Dashboard')
        // const dataDashboard = await sequelize.query(
        //     `select * from axeso.fn_cargar_dashboard(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Dashboard', dataDashboard)
        
        // await sequelize.query(
        //     `INSERT INTO axeso.jobs_detalle(fecha_registro) VALUES (now() - interval '10 hour')`,
        //     { type: Sequelize.QueryTypes.INSERT }
        // );
        // console.log('Insert en la tabla jobs_detalle');
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