import IndicadoresServicioFillRate from "../models/indicadoresservicios_fillrate.model";
import IndicadoresServicioLeadTime from "../models/indicadoresservicios_leadtime.model";
import IndicadoresServicioDiasInventario from "../models/indicadoresservicios_diasinventario.model";
import IndicadoresServicioInvFueraPlazo from "../models/indicadoresservicios_invfueraplazo.model";

export async function getIndicadoresServicio(req, res) {
    const {
        p_proveedorid,
        p_anioid
    } = req.body;
    try {

        if(p_proveedorid === null) {
            return res.status(200).json("Valor de proveedorid es obligatorio");
        }

        if(p_anioid === null) {
            return res.status(200).json("Valor de año es obligatorio");
        }

        const entidadesFillRate = await IndicadoresServicioFillRate.sequelize.query(
            `select * from axeso.indicadorservicio_fillrate where idproveedor = '${p_proveedorid}' AND anio = '${p_anioid}'`,
            { type: IndicadoresServicioFillRate.sequelize.QueryTypes.SELECT }
        );

        const entidadesDiasInventario = await IndicadoresServicioDiasInventario.sequelize.query(
            `select * from public.indicadorservicio_diasinventario where idproveedor = '${p_proveedorid}' AND anio = '${p_anioid}'`,
            { type: IndicadoresServicioDiasInventario.sequelize.QueryTypes.SELECT }
        );

        let entidadesLeadTime = await IndicadoresServicioLeadTime.sequelize.query(
            `select * from axeso.indicadorservicio_leadtime where idproveedor = '${p_proveedorid}' AND anio = '${p_anioid}'`,
            { type: IndicadoresServicioLeadTime.sequelize.QueryTypes.SELECT }
        );
        
        let entidadesInvFueraPlazo = await IndicadoresServicioInvFueraPlazo.sequelize.query(
            `select * from public.indicadorservicio_invfueraplazo where idproveedor = '${p_proveedorid}' AND anio = '${p_anioid}'`,
            { type: IndicadoresServicioInvFueraPlazo.sequelize.QueryTypes.SELECT }
        );
        

        const responseFormat = {
            fill_rate: {
                table_fill_rate: entidadesFillRate
            },
            dias_inventario: {
                table_dias_inventario: entidadesDiasInventario
            },
            lead_time: {
                table_lead_time: entidadesLeadTime
            },
            inventario_fueraplazo: {
                table_inventario_fueraplazo: entidadesInvFueraPlazo
            }

        }

        if (entidadesFillRate && entidadesDiasInventario && entidadesLeadTime && entidadesInvFueraPlazo) {
            return res.status(200).json({
                data: responseFormat
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
        
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}