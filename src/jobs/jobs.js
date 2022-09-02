import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {

        console.log('Executing Insert Alm1')
        const insertAlm1 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (13)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm1', insertAlm1)

        console.log('Executing Insert Alm2')
        const insertAlm2 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (9)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm2', insertAlm2)

        console.log('Executing Insert Alm3')
        const insertAlm3 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (18)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm3', insertAlm3)

        console.log('Executing Insert Alm4')
        const insertAlm4 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (5)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm4', insertAlm4)

        console.log('Executing Insert Alm5')
        const insertAlm5 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (19)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm5', insertAlm5)

        console.log('Executing Insert Alm6')
        const insertAlm6 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (33)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm6', insertAlm6)

        console.log('Executing Insert Alm7')
        const insertAlm7 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (26)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm7', insertAlm7)

        console.log('Executing Insert Alm8')
        const insertAlm8 = await sequelize.query(
            'insert into axeso.almacen_web (idalmacen) values (22)',
            { type: Sequelize.QueryTypes.INSERT }
        )
        console.log('Done Job Insert Alm8', insertAlm8)

        // console.log('Executing load data Sellout Periodo Agosto 2022')
        // const dataSellout_07 = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual('468','08')`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout Periodo Agosto 2022', dataSellout_07)

        // console.log('Executing delete Dashboard Sellout Cobertura')
        // const deleteSellCob = await sequelize.query(
        //     `delete from axeso.dashboard_sellout_cobertura`,
        //     { type: Sequelize.QueryTypes.DELETE }
        // );
        // console.log('Done Job delete Dashboard Sellout Cobertura', deleteSellCob)

        // console.log('Executing delete Dashboard Inventario')
        // const deleteInv = await sequelize.query(
        //     `delete from axeso.dashboard_inventario`,
        //     { type: Sequelize.QueryTypes.DELETE }
        // );
        // console.log('Done Job delete Dashboard Inventario', deleteInv)

        // console.log('Executing delete Dashboard Deuda Pendiente')
        // const deleteDeudPend = await sequelize.query(
        //     `delete from axeso.dashboard_deudapendiente`,
        //     { type: Sequelize.QueryTypes.DELETE }
        // );
        // console.log('Done Job delete Dashboard Deuda Pendiente', deleteDeudPend)

        // console.log('Executing delete Dashboard SellIn')
        // const deleteSellin = await sequelize.query(
        //     `delete from axeso.dashboard_sellin`,
        //     { type: Sequelize.QueryTypes.DELETE }
        // );
        // console.log('Done Job delete Dashboard SellIn', deleteSellin)

        // console.log('Executing delete Dashboard SellIn Sellout Mensual')
        // const deleteSellinout = await sequelize.query(
        //     `delete from axeso.dashboard_sellin_sellout_mensual`,
        //     { type: Sequelize.QueryTypes.DELETE }
        // );
        // console.log('Done Job delete Dashboard SellIn Sellout Mensual', deleteSellinout)        

        // console.log('Executing load data Sellout Periodo Actual')
        // const dataSellout = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout Periodo Actual', dataSellout)

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