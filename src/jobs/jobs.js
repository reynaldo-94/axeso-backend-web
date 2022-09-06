import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

export async function jobs() {
    console.log('Executing Jobs')
    try {
        
        // console.log('Executing load data Sellout Periodo Actual')
        // const dataSellout = await sequelize.query(
        //     `select * from axeso.fn_cargar_sellout_por_periodo_actual()`,
        //     { type: Sequelize.QueryTypes.SELECT }
        // );
        // console.log('Done Job Sellout Periodo Actual', dataSellout)        

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

        console.log('Executing load data Indicadores Servicios Farm 2021')
        const dataIndSrvAxesoFarm1 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0719','2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Farm 2021', dataIndSrvAxesoFarm1)

        console.log('Executing load data Indicadores Servicios Farm 2022')
        const dataIndSrvAxesoFarm2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0719','2022','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Farm 2022', dataIndSrvAxesoFarm2)

        console.log('Executing load data Indicadores Servicios Gsk 2021')
        const dataIndSrvAxesoGsk1 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0987','2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Gsk 2021', dataIndSrvAxesoGsk1)

        console.log('Executing load data Indicadores Servicios Gsk 2022')
        const dataIndSrvAxesoGsk2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0987','2022','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Gsk 2022', dataIndSrvAxesoGsk2)

        console.log('Executing load data Indicadores Servicios Mol 2021')
        const dataIndSrvAxesoMol1 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P044','2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Mol 2021', dataIndSrvAxesoMol1)

        console.log('Executing load data Indicadores Servicios Mol 2022')
        const dataIndSrvAxesoMol2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P044','2022','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Mol 2022', dataIndSrvAxesoMol2)

        console.log('Executing load data Indicadores Servicios Ali 2021')
        const dataIndSrvAxesoAli1 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P103','2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Ali 2021', dataIndSrvAxesoAli1)

        console.log('Executing load data Indicadores Servicios Ali 2022')
        const dataIndSrvAxesoAli2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P103','2022','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Ali 2022', dataIndSrvAxesoAli2)

        console.log('Executing load data Indicadores Servicios Geno 2021')
        const dataIndSrvAxesoGeno1 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0730','2021','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Geno 2021', dataIndSrvAxesoGeno1)

        console.log('Executing load data Indicadores Servicios Geno 2022')
        const dataIndSrvAxesoGeno2 = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P0730','2022','SI')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Indicadores Servicios Geno 2022', dataIndSrvAxesoGeno2)

        
        
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