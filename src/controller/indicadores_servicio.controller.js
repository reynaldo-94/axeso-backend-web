import IndicadorServicioFillRate from "../models/indicadoresservicios_fillrate.model";
import IndicadorServicioLeadTime from "../models/indicadoresservicios_leadtime.model";
import IndicadorServicioInvFueraPlazo from "../models/indicadoresservicios_invfueraplazo.model";
import IndicadorServicioDiasInventario from "../models/indicadoresservicios_diasinventario.model";
import { Op } from 'sequelize';

export async function getIndicadoresServicio(req, res) {
    const {
        p_proveedorid,
        p_anioid
    } = req.body;   

    if(p_proveedorid === null) {
        return res.status(200).json("Valor de proveedorid es obligatorio");
    }

    if(p_anioid === null) {
        return res.status(200).json("Valor de año es obligatorio");
    }

    let entidadesFillRate = await IndicadorServicioFillRate.findAll({
        where: {
            [Op.and]: IndicadorServicioFillRate.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        }
    });

    let entidadesDiasInventario = await IndicadorServicioDiasInventario.findAll({
        where: {
            [Op.and]: IndicadorServicioDiasInventario.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        }
    });

    let entidadesLeadTime = await IndicadorServicioLeadTime.findAll({
        where: {
            [Op.and]: IndicadorServicioLeadTime.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        }
    });

    let entidadesInvFueraPlazo = await IndicadorServicioInvFueraPlazo.findAll({
        where: {
            [Op.and]: IndicadorServicioInvFueraPlazo.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        }
    })        

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

    if (entidadesDiasInventario) {
        return res.status(200).json({
            data: responseFormat
        });
    } else {
        return res.status(200).json({
            data: {}
        });
    }
        
    
}

export async function getIndicadoresServicio2(req, res) {
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

        // let entidadesFillRate = await IndicadorServicioFillRate.findAll({
        //     where: {
        //         [Op.and]: IndicadorServicioFillRate.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        //     }
        // }); 

        let entidadesDiasInventario = await Inventario.sequelize.query(
            "select * from public.inventario limit 3", {
                type: Inventario.sequelize.QueryTypes.SELECT,
            });
        console.log('entidadesDiasInventario', entidadesDiasInventario)

        // let entidadesDiasInventario = await IndicadorServicioDiasInventario.findAll({
        //     where: {
        //         [Op.and]: IndicadorServicioDiasInventario.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        //     }
        // });

        // let entidadesLeadTime = await IndicadorServicioLeadTime.findAll({
        //     where: {
        //         [Op.and]: IndicadorServicioLeadTime.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        //     }
        // });

        // let entidadesInvFueraPlazo = await IndicadorServicioInvFueraPlazo.findAll({
        //     where: {
        //         [Op.and]: IndicadorServicioInvFueraPlazo.sequelize.literal("idproveedor = '" + p_proveedorid + "' AND anio = '" + p_anioid + "'")
        //     }
        // })        

        const responseFormat = {
            fill_rate: {
                table_fill_rate: []
            },
            dias_inventario: {
                table_dias_inventario: entidadesDiasInventario
            },
            lead_time: {
                table_lead_time: []
            },
            inventario_fueraplazo: {
                table_inventario_fueraplazo: []
            }

        }

        if (entidadesDiasInventario) {
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