import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import { sequelizeBi } from '../database/database-bi';

export async function jobNivelServicioDosUltimosMeses() {
    console.log('Executing Jobs: jobNivelServicioDosUltimosMeses')
    try {        
        const today = new Date();
        const year = today.getFullYear()
        const month = today.getMonth + 1

        console.log('Executing load Month 1 DatabaseDimexaGestion')
        const loadMonth1G = await sequelize.query(
            `select * from axeso.fn_cargar_indicadorservicio('P007', '${year}', '${month}')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Month 1 DatabaseDimexaGestion', loadMonth1G)

        console.log('Executing load Month 1 DatabaseDimexaBi')
        const loadMonth1B = await sequelizeBi.query(
            `select * from public.f_axeso_cargar_indicadorservicio('P007', '${year}', '${month}')`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log('Done Job Month 1 DatabaseDimexaBi', loadMonth1B)

        if (month > 1 ) {
            console.log('Executing load Month 2 DatabaseDimexaGestion')
            const loadMonth2G = await sequelize.query(
                `select * from axeso.fn_cargar_indicadorservicio('P007', '${year}', '${month - 1}')`,
                { type: Sequelize.QueryTypes.SELECT }
            );
            console.log('Done Job Month 2 DatabaseDimexaGestion', loadMonth2G)

            console.log('Executing load Month 2 DatabaseDimexaBi')
            const loadMonth2B = await sequelizeBi.query(
                `select * from public.f_axeso_cargar_indicadorservicio('P007', '${year}', '${month - 1}')`,
                { type: Sequelize.QueryTypes.SELECT }
            );
            console.log('Done Job Month 2 DatabaseDimexaBi', loadMonth2B)
        }
        
        await sequelize.query(
            `INSERT INTO axeso.jobs_detalle(fecha_registro, tipoid, descripcion) VALUES (now() - interval '10 hour', 2, 'Nivel de servicio')`,
            { type: Sequelize.QueryTypes.INSERT }
        );
        console.log('Insert en la tabla jobs_detalle');
    } catch (e) {
        console.log('Error in Jobs', e)
    }
    console.log('Done Jobs')
}