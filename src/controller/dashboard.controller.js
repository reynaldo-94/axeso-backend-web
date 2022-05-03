import DashboardDeudaPendiente from '../models/dashboard_deudapendiente.model';
import DashboardInventario from '../models/dashboard_inventario.model';
import DashboardSelloutCobertura from '../models/dashboard_sellout_cobertura.model';
import DashboardSellin from '../models/dashboard_sellin.model';
import { Op } from 'sequelize';
import DashboardSellinSelloutMensual from '../models/dashboard_sellint_sellout_mensual.model';

export async function postJobDashboard(req, res) {
    try {
        let entidadesLotes = await DashboardDeudaPendiente.sequelize.query(
            "select * from axeso.fn_dashboard_insertardatos();", {
                type: DashboardDeudaPendiente.sequelize.QueryTypes.SELECT,
            });
        return res.status(200).json({ 
            data: {}
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
} 

export async function getDashboard(req, res) {
    const {
        proveedorid,
        lineaid
    } = req.body;
    let xp_lineaid = null;

    try {

        if(proveedorid === null) {
            return res.status(200).json("Valor de proveedorid es obligatorio");
        }

        if (lineaid != null) {
            xp_lineaid = "'" + lineaid + "'";
        }

        let entidadesSellCob = await DashboardSelloutCobertura.sequelize.query(
            "SELECT * from fn_get_dashboard_sellout_cobertura('" + proveedorid + "'," + xp_lineaid + ")", {
                type: DashboardSelloutCobertura.sequelize.QueryTypes.SELECT,
            });

        let entidadesInv = await DashboardInventario.sequelize.query(
            "SELECT * from fn_get_dashboard_inventario('" + proveedorid + "'," + xp_lineaid + ")", {
                type: DashboardInventario.sequelize.QueryTypes.SELECT,
            });

        let entidadesDeudPend = await DashboardDeudaPendiente.findAll({
            where: {
                [Op.and]: DashboardDeudaPendiente.sequelize.literal("idproveedor = '" + proveedorid + "'")                
            }
        });

        let entidadesSellIn = await DashboardSellin.findAll({
            where: {
                [Op.and]: DashboardSellin.sequelize.literal("idproveedor = '" + proveedorid + "' AND (idlinea = '" + lineaid + "' OR COALESCE (idlinea,'" + lineaid + "') = 'null')")                
            }
        });

        let entidadesSellinSelloutMensual = await DashboardSellinSelloutMensual.findAll({
            where: {
                [Op.and]: DashboardSellinSelloutMensual.sequelize.literal("idproveedor = '" + proveedorid + "' AND (idlinea = '" + lineaid + "' OR COALESCE (idlinea,'" + lineaid + "') = 'null')")                
            }
        });

        const responseFormat = {
            sell_out: {
                progress_circular: entidadesSellCob[0]?.sellout_cumplimiento || 0,
                porcentaje: entidadesSellCob[0]?.sellout_crecimiento_ytd || 0,
                tipo: entidadesSellCob[0]?.sellout_tipo || 'YTD',
                cantidad: entidadesSellCob[0]?.sellout_ventaxmes || 0
            },
            cobertura: {
                cantidad: entidadesSellCob[0]?.cobertura_clientexmes,
                porcentaje: entidadesSellCob[0]?.cobertura_crecimiento_ytd,
                tipo: entidadesSellCob[0]?.cobertura_tipo,
                cobertura_mes: [
                    entidadesSellCob[0]?.cobertura_mes_ant_06_tit,
                    entidadesSellCob[0]?.cobertura_mes_ant_05_tit,
                    entidadesSellCob[0]?.cobertura_mes_ant_04_tit,
                    entidadesSellCob[0]?.cobertura_mes_ant_03_tit,
                    entidadesSellCob[0]?.cobertura_mes_ant_02_tit,
                    entidadesSellCob[0]?.cobertura_mes_ant_01_tit,
                ],
                cobertura_series: [
                    entidadesSellCob[0]?.cobertura_mes_ant_06,
                    entidadesSellCob[0]?.cobertura_mes_ant_05,
                    entidadesSellCob[0]?.cobertura_mes_ant_04,
                    entidadesSellCob[0]?.cobertura_mes_ant_03,
                    entidadesSellCob[0]?.cobertura_mes_ant_02,
                    entidadesSellCob[0]?.cobertura_mes_ant_01,
                ]
            },
            tabla_inventario: entidadesInv,
            sell_in: {
                cantidad: entidadesSellIn[0]?.sellin_cantidad,
                porcentaje: entidadesSellIn[0]?.sellin_crecimiento_ytd,
                tipo: entidadesSellIn[0]?.sellin_tipo,
                sellin_mes: [
                    entidadesSellIn[0]?.sellin_mes_ant_06_tit,
                    entidadesSellIn[0]?.sellin_mes_ant_05_tit,
                    entidadesSellIn[0]?.sellin_mes_ant_04_tit,
                    entidadesSellIn[0]?.sellin_mes_ant_03_tit,
                    entidadesSellIn[0]?.sellin_mes_ant_02_tit,
                    entidadesSellIn[0]?.sellin_mes_ant_01_tit,
                ],
                sellin_series: [
                    entidadesSellIn[0]?.sellin_mes_ant_06,
                    entidadesSellIn[0]?.sellin_mes_ant_05,
                    entidadesSellIn[0]?.sellin_mes_ant_04,
                    entidadesSellIn[0]?.sellin_mes_ant_03,
                    entidadesSellIn[0]?.sellin_mes_ant_02,
                    entidadesSellIn[0]?.sellin_mes_ant_01,
                ],
            },
            deuda_pendiente: {
                cantidad: entidadesDeudPend[0]?.deudapendiente_cantidad,
                corriente: entidadesDeudPend[0]?.deudapendiente_corriente,
                no_corriente: entidadesDeudPend[0]?.deudapendiente_nocorriente
            },
            sell_in_sell_out_mensual: {
                categoria_mes: [
                    entidadesSellinSelloutMensual[0]?.mes_ant_01_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_02_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_03_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_04_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_05_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_06_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_07_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_08_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_09_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_10_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_11_tit,
                    entidadesSellinSelloutMensual[0]?.mes_ant_12_tit,
                ],
                serie_sell_in: [entidadesSellinSelloutMensual[0]?.sellin_mes_ant_01,entidadesSellinSelloutMensual[0]?.sellin_mes_ant_02, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_03, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_04, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_05, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_06, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_07, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_08, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_09, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_10, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_11, entidadesSellinSelloutMensual[0]?.sellin_mes_ant_12],
                serie_sell_out: [entidadesSellinSelloutMensual[0]?.sellout_mes_ant_01,entidadesSellinSelloutMensual[0]?.sellout_mes_ant_02, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_03, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_04, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_05, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_06, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_07, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_08, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_09, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_10, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_11, entidadesSellinSelloutMensual[0]?.sellout_mes_ant_12],
            }
        }
        if (entidadesSellCob && entidadesInv && entidadesDeudPend) {
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
};

export async function getDashboardAnt(req, res) {
    const {
        proveedorid,
        lineaid
    } = req.body;
    let xp_lineaid = null;
    try {
        // console.log('proveedorid', proveedorid)
        // console.log('lineaid', lineaid)

        if(proveedorid === null) {
            return res.status(200).json("Valor de proveedorid es obligatorio");
        }

        if (lineaid !== null) {
            xp_lineaid = "'" + lineaid + "'";
        }
        
        let entidadesSellCob = await DashboardSelloutCobertura.sequelize.query(
            "SELECT * from fn_get_dashboard_sellout_cobertura('" + proveedorid + "'," + xp_lineaid + ")", {
            type: DashboardSelloutCobertura.sequelize.QueryTypes.SELECT,
        });

        let entidadesInv = await DashboardInventario.sequelize.query(
            "SELECT * from fn_get_dashboard_inventario('" + proveedorid + "'," + xp_lineaid + ")", {
            type: DashboardInventario.sequelize.QueryTypes.SELECT,
        });

        let entidadesDeudPend = await DashboardDeudaPendiente.sequelize.query(
            "SELECT * from fn_get_dashboard_deudapendiente('" + proveedorid + "')", {
            type: DashboardDeudaPendiente.sequelize.QueryTypes.SELECT,
        });
        // console.log('entidadesDeudPend', entidadesDeudPend)
        // console.log('entidadesInventario', entidadesInv)

        const responseFormat = {
            sell_out: {
                progress_circular: entidadesSellCob[0].sellout_cumplimiento,
                porcentaje: entidadesSellCob[0].sellout_crecimiento_ytd,
                tipo: entidadesSellCob[0].sellout_tipo,
                cantidad: entidadesSellCob[0].sellout_ventaxmes
            },
            cobertura: {
                cantidad: entidadesSellCob[0].cobertura_clientexmes,
                porcentaje: entidadesSellCob[0].cobertura_crecimiento_ytd,
                tipo: entidadesSellCob[0].cobertura_tipo,
                cobertura_mes: [
                    entidadesSellCob[0].cobertura_mes_ant_06_tit,
                    entidadesSellCob[0].cobertura_mes_ant_05_tit,
                    entidadesSellCob[0].cobertura_mes_ant_04_tit,
                    entidadesSellCob[0].cobertura_mes_ant_03_tit,
                    entidadesSellCob[0].cobertura_mes_ant_02_tit,
                    entidadesSellCob[0].cobertura_mes_ant_01_tit,
                ],
                cobertura_series: [
                    entidadesSellCob[0].cobertura_mes_ant_06,
                    entidadesSellCob[0].cobertura_mes_ant_05,
                    entidadesSellCob[0].cobertura_mes_ant_04,
                    entidadesSellCob[0].cobertura_mes_ant_03,
                    entidadesSellCob[0].cobertura_mes_ant_02,
                    entidadesSellCob[0].cobertura_mes_ant_01,
                ]
            },
            tabla_inventario: entidadesInv,
            deuda_pendiente: {
                cantidad: entidadesDeudPend[0].deudapendiente_cantidad,
                corriente: entidadesDeudPend[0].deudapendiente_corriente,
                no_corriente: entidadesDeudPend[0].deudapendiente_nocorriente
            },
            sell_in_sell_out_mensual: {
                categoria_mes: [
                    'Feb 21',
                    'Mar 21',
                    'Abr 21',
                    'May 21',
                    'Jun 21',
                    'Jul 21',
                    'Ago 21',
                    'Sep 21',
                    'Oct 21',
                    'Nov 21',
                    'Dic 21',
                    'Ene 21',
                ],
                serie_sell_in: [159, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                serie_sell_out: [100, 78, 98, 93, 106, 84, 105, 104 ,91, 83, 106, 92],
            }
        }
        if (entidadesSellCob && entidadesInv) {
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
};