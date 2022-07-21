import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {

        console.log('Executing load data compras ingresos 441')
        const dataCompras441 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('441')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 441', dataCompras441)

        console.log('Executing load data compras ingresos 442')
        const dataCompras442 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('442')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 442', dataCompras442)

        console.log('Executing load data compras ingresos 443')
        const dataCompras443 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('443')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 443', dataCompras443)

        console.log('Executing load data compras ingresos 444')
        const dataCompras444 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('444')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 444', dataCompras444)

        console.log('Executing load data compras ingresos 445')
        const dataCompras445 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('445')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 445', dataCompras445)

        console.log('Executing load data compras ingresos 446')
        const dataCompras446 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('446')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 446', dataCompras446)

        console.log('Executing load data compras ingresos 447')
        const dataCompras447 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('447')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 447', dataCompras447)

        console.log('Executing load data compras ingresos 448')
        const dataCompras448 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('448')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 448', dataCompras448)

        console.log('Executing load data compras ingresos 449')
        const dataCompras449 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('449')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 449', dataCompras449)

        console.log('Executing load data compras ingresos 450')
        const dataCompras450 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('450')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 450', dataCompras450)

        console.log('Executing load data compras ingresos 451')
        const dataCompras451 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('451')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 451', dataCompras451)

        console.log('Executing load data compras ingresos 452')
        const dataCompras452 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('452')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 452', dataCompras452)

        console.log('Executing load data compras ingresos 461')
        const dataCompras461 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('461')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 461', dataCompras461)

        console.log('Executing load data compras ingresos 462')
        const dataCompras462 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('462')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 462', dataCompras462)

        console.log('Executing load data compras ingresos 463')
        const dataCompras463 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('463')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 463', dataCompras463)

        console.log('Executing load data compras ingresos 464')
        const dataCompras464 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('464')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 464', dataCompras464)

        console.log('Executing load data compras ingresos 465')
        const dataCompras465 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('465')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 465', dataCompras465)

        console.log('Executing load data compras ingresos 466')
        const dataCompras466 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('466')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 466', dataCompras466)

        console.log('Executing load data compras ingresos 467')
        const dataCompras467 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('467')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job compras ingresos 467', dataCompras467)

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