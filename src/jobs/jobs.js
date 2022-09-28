import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {

        console.log('Executing load data Compras Periodo Enero')
        const dataCompras1 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('441')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Enero', dataCompras1)

        console.log('Executing load data Compras Periodo Febrero')
        const dataCompras2 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('442')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Febrero', dataCompras2)

        console.log('Executing load data Compras Periodo Marzo')
        const dataCompras3 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('443')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Marzo', dataCompras3)

        console.log('Executing load data Compras Periodo Abril')
        const dataCompras4 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('444')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Abril', dataCompras4)

        console.log('Executing load data Compras Periodo Mayo')
        const dataCompras5 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('445')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Mayo', dataCompras5)

        console.log('Executing load data Compras Periodo Junio')
        const dataCompras6 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('446')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Junio', dataCompras6)

        console.log('Executing load data Compras Periodo Julio')
        const dataCompras7 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('447')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Julio', dataCompras7)

        console.log('Executing load data Compras Periodo Agosto')
        const dataCompras8 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('448')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Agosto', dataCompras8)

        console.log('Executing load data Compras Periodo Setiembre')
        const dataCompras9 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('449')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Setiembre', dataCompras9)

        console.log('Executing load data Compras Periodo Octubre')
        const dataCompra10 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('450')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Octubre', dataCompra10)

        console.log('Executing load data Compras Periodo Noviembre')
        const dataCompras11 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('451')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Noviembre', dataCompras11)

        console.log('Executing load data Compras Periodo Diciembre')
        const dataCompras12 = await sequelize.query(
            `select * from axeso.fn_cargar_comprasingresos('452')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Compras Periodo Diciembre', dataCompras12)

        console.log('Executing load data Indicadores Servicios 2021')
        const dataIndSrvAxesoFarm2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio(null,'2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios 2021', dataIndSrvAxesoFarm2)

        // console.log('Executing load data Sellout Periodo Actual')
        // const dataSellout = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout Periodo Actual', dataSellout)
        
        // console.log('Executing load data Compras Periodo Actual')
        // const dataCompras = await sequelize.query(
        //     `select * from axeso.fn_cargar_comprasingresos(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Compras Periodo Actual', dataCompras)

        // console.log('Executing load data Deuda Pendiente')
        // const dataDeudaPend = await sequelize.query(
        //     `select * from axeso.fn_cargar_deuda_pendiente(null)`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Deuda Pendiente', dataDeudaPend)        

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

export async function jobsIndicadorServicio() {
    try {
        
        console.log('Executing load data Indicador Servicio Mes Actual')
        const dataSellout = await sequelize.query(
            `select * from axeso.fn_cargar_()`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Sellout Periodo Actual', dataSellout)
    } catch (e) {
        console.log('Error in Jobs', e)
    }
}