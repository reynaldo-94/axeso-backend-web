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

        console.log('proveedorid', p_proveedorid)
        console.log('anioid', p_anioid)

        let entidadesFillRate = await IndicadoresServicioFillRate.sequelize.query(
            "SELECT * FROM fn_get_indicadores_servicios_fillrate('" + p_proveedorid + "','" + p_anioid + "')", {
                type: IndicadoresServicioFillRate.sequelize.QueryTypes.SELECT,
            });
        
        console.log('entidadesFillRate', entidadesFillRate)

        let entidadesDiasInventario = await IndicadoresServicioDiasInventario.sequelize.query(
            "SELECT * FROM fn_get_indicadores_servicios_diasinventario('" + p_proveedorid + "','" + p_anioid + "')", {
                type: IndicadoresServicioDiasInventario.sequelize.QueryTypes.SELECT,
            });

        let entidadesLeadTime = await IndicadoresServicioLeadTime.sequelize.query(
            "SELECT * FROM fn_get_indicadores_servicios_leadtime('" + p_proveedorid + "','" + p_anioid + "')", {
                type: IndicadoresServicioLeadTime.sequelize.QueryTypes.SELECT,
            });
        
        let entidadesInvFueraPlazo = await IndicadoresServicioInvFueraPlazo.sequelize.query(
            "SELECT * FROM fn_get_indicadores_servicios_inventariofueraplazo('" + p_proveedorid + "','" + p_anioid + "')", {
                type: IndicadoresServicioInvFueraPlazo.sequelize.QueryTypes.SELECT,
            });
        
        console.log('entidadesInvFueraPlazo', entidadesInvFueraPlazo)       
        

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

        if (entidadesFillRate && entidadesLeadTime) {
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