import {
    json,
    where
} from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Factura from '../models/factura.model';
import Documento from '../models/documento.model';
import TipoDocumentoEstado from '../models/tipodocestado.model';
import MotivoReclamo from '../models/vmotivo_reclamo.model';
import RubroMotivoReclamo from '../models/vrubro_motivo_reclamo.model';
import Moneda from '../models/vmoneda.model';
import Serie from '../models/serie.model';
import Numero from '../models/numero.model';
import AmortizacionCuentasPagar from '../models/amortizacioncuentaspagar.model';
import TipoDeuda from '../models/vtipodeuda.model';
import TipoReclamo from '../models/vtiporeclamo.model';
import RangoDias from '../models/vrangodias.model';
import DeudaPendienteResumen from '../models/deuda_pendiente_resumen.model';
import DeudaPendienteRubro from '../models/vdeuda_pendiente_rubro.model';
import DeudaPendienteList from '../models/deuda_pendiente_list.model';
import CuentasPagar from '../models/cuentaspagar.model';
export async function getFacturas(req, res) {
    const { p_proveedorid } = req.body;
    let sid = "''";
    let xp_proveedorid = null;
    try {
        //sid = clienteid.join(",");

        if (p_proveedorid != null) {
            xp_proveedorid = "'" + p_proveedorid.join(",") + "'";
        }
        console.log(xp_proveedorid)
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await Factura.sequelize.query(
            "SELECT * from fn_facturas(" + xp_proveedorid + ")", {
                type: Factura.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

export async function getDocumentos(req, res) {
    const { p_proveedorid, p_tipo_documento, p_unidadnegocioid, p_lineaid } = req.body;
    let sid = "''";
    let xp_proveedorid = null;
    let xp_unidadnegocioid = null;
    let xp_lineaid = null;
    let xp_tipo_documento = null;
    try {
        if (p_proveedorid != null) {
            xp_proveedorid = "'" + p_proveedorid.join(",") + "'";
        }
        if (p_unidadnegocioid != null) {
            xp_unidadnegocioid = "'" + p_unidadnegocioid.join(",") + "'";
        }
        if (p_lineaid != null) {
            xp_lineaid = "'" + p_lineaid.join(",") + "'";
        }
        if (p_tipo_documento != null) {
            xp_tipo_documento = "'" + p_tipo_documento + "'";
        }
        console.log(p_tipo_documento)
        console.log(xp_tipo_documento)
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await Documento.sequelize.query(
            "SELECT * from fn_docs_tipo_documento(" + xp_proveedorid + "," + xp_tipo_documento + "," + xp_unidadnegocioid + "," + xp_lineaid + ")", {
                type: Documento.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

export async function getTipoDocumentos(req, res) {
    try {

        let entidades = await TipoDocumentoEstado.sequelize.query(
            "SELECT * from axeso.fn_get_tipo_documentos_estado();", {
                type: TipoDocumentoEstado.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getMotivoReclamos(req, res) {
    try {

        let entidades = await MotivoReclamo.sequelize.query(
            "SELECT * from axeso.vmotivo_reclamo;", {
                type: MotivoReclamo.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getRubroMotivoReclamos(req, res) {
    try {

        let entidades = await RubroMotivoReclamo.sequelize.query(
            "SELECT * from axeso.vreclamo_motivo_rubro;", {
                type: RubroMotivoReclamo.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getMonedas(req, res) {
    try {

        let entidades = await Moneda.sequelize.query(
            "SELECT * from axeso.vmoneda;", {
                type: Moneda.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getSerieDocumentos(req, res) {
    const { p_tipo_documento } = req.body;
    let sid = "''";

    try {
        let entidades = await Serie.sequelize.query(
            "SELECT * from fn_documento_serie('" + p_tipo_documento + "')", {
                type: Serie.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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
export async function getNumeroDocumentos(req, res) {
    const { p_tipo_documento, p_serie } = req.body;
    let sid = "''";

    try {
        let entidades = await Numero.sequelize.query(
            "SELECT * from fn_documento_numero('" + p_tipo_documento + "','" + p_serie + "')", {
                type: Numero.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

export async function getLiquidacionDocumentos(req, res) {

    const { p_proveedorid, p_tipo_documento, p_serie, p_numero } = req.body;
    try {
        let entidades_cuentapagar = await CuentasPagar.sequelize.query(
            "SELECT * FROM fn_cuentaspagar('" + p_tipo_documento + "','" + p_serie + "','" + p_numero + "','"+ p_proveedorid +"')", {
                type: CuentasPagar.sequelize.QueryTypes.SELECT,
            });

        let entidades_amortizacion = await AmortizacionCuentasPagar.sequelize.query(
            "SELECT * from fn_amortizacion_cuentaspagar('" + p_tipo_documento + "','" + p_serie + "','" + p_numero + "','"+ p_proveedorid +"')", {
                type: AmortizacionCuentasPagar.sequelize.QueryTypes.SELECT,
            });
        const responseFormat = {
            cuentas_pagar: entidades_cuentapagar,
            amortizacion: entidades_amortizacion
        }
        if (entidades_cuentapagar && entidades_amortizacion) {
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
export async function getAmortizacionCuentaPagar(req, res) {
    const { p_tipo_documento, p_serie, p_numero } = req.body;
    let sid = "''";
    console.log(p_tipo_documento);
    try {
        let entidades = await AmortizacionCuentasPagar.sequelize.query(
            "SELECT * from fn_amortizacion_cuentaspagar('" + p_tipo_documento + "','" + p_serie + "','" + p_numero + "')", {
                type: AmortizacionCuentasPagar.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

export async function getTipoDeudas(req, res) {
    try {

        let entidades = await TipoDeuda.sequelize.query(
            "SELECT * from axeso.vtipodeudas;", {
                type: TipoDeuda.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getTipoReclamos(req, res) {
    try {

        let entidades = await TipoReclamo.sequelize.query(
            "SELECT * from axeso.vtiporeclamos;", {
                type: TipoReclamo.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getRangoDias(req, res) {
    try {

        let entidades = await RangoDias.sequelize.query(
            "SELECT * from axeso.vrangodias;", {
                type: RangoDias.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
            });
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getDeudaPendienteResumen(req, res) {
    const { p_proveedorid } = req.body;
    let sid = "''";
    let xp_proveedorid = null;

    try {
        if (p_proveedorid != null) {
            xp_proveedorid = "'" + p_proveedorid.join(",") + "'";
        }

    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await DeudaPendienteResumen.sequelize.query(
            "SELECT * from fn_get_deuda_pendiente_resumen(" + xp_proveedorid + ")", {
                type: DeudaPendienteResumen.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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


export async function getDeudaPendienteRubro(req, res) {
    const { p_tipodeudaid } = req.body;
    let sid = "''";
    let xp_tipodeudaid = null;

    try {
        if (p_tipodeudaid != null) {
            xp_tipodeudaid = "'" + p_tipodeudaid + "'";
        }

    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await DeudaPendienteRubro.sequelize.query(
            "SELECT * from fn_get_deuda_pendiente_rubros(" + xp_tipodeudaid + ")", {
                type: DeudaPendienteRubro.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

export async function getDeudaPendienteList(req, res) {
    const { p_proveedorid, p_uninegid, p_tiporeclamoid, p_rangodiasid } = req.body;
    let xp_proveedorid = null;
    let xp_uninegid = null;
    let xp_tiporeclamoid = null;
    let xp_rangodiasid = null;
    try {
        if (p_proveedorid != null) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        if (p_uninegid != null) {
            xp_uninegid = "'" + p_uninegid.join(",") + "'";
        }
        if (p_tiporeclamoid != null) {
            xp_tiporeclamoid = "'" + p_tiporeclamoid + "'";
        }
        if (p_rangodiasid != null) {
            xp_rangodiasid = "'" + p_rangodiasid + "'";
        }
    } catch (error) {
        console.log(error.message)
    }
    try {
        let entidades = await DeudaPendienteList.sequelize.query(
            "SELECT * from fn_get_deuda_pendiente_list(" + xp_proveedorid + "," + xp_uninegid + "," + xp_tiporeclamoid + "," + xp_rangodiasid + ")", {
                type: DeudaPendienteList.sequelize.QueryTypes.SELECT,
            });

        if (entidades) {
            return res.status(200).json({
                data: entidades
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

// export async function getDeudaPendienteList(req, res) {
//     const { p_proveedorid, p_uninegid, p_tipodeudaid, p_rubroid } = req.body;
//     let sid = "''";
//     let xp_proveedorid = null;
//     let xp_uninegid = null;
//     let xp_tipodeudaid = null;
//     let xp_rubroid = null;
//     try {
//         if (p_proveedorid != null) {
//             xp_proveedorid = "'" + p_proveedorid + "'";
//         }
//         if (p_uninegid != null) {
//             xp_uninegid = "'" + p_uninegid + "'";
//         }
//         if (p_tipodeudaid != null) {
//             xp_tipodeudaid = "'" + p_tipodeudaid + "'";
//         }
//         if (p_rubroid != null) {
//             xp_rubroid = "'" + p_rubroid + "'";
//         }
//     } catch (error) {
//         console.log(error.message)

//     }
//     try {
//         let entidades = await DeudaPendienteList.sequelize.query(
//             "SELECT * from fn_get_deuda_pendiente_list(" + xp_proveedorid + "," + xp_uninegid + "," + xp_tipodeudaid + "," + xp_rubroid + ")", {
//                 type: DeudaPendienteList.sequelize.QueryTypes.SELECT,
//             });

//         if (entidades) {
//             return res.status(200).json({
//                 data: entidades
//             });
//         } else {
//             return res.status(200).json({
//                 data: {}
//             });
//         }
//     } catch (e) {
//         return res.status(500).json({
//             message: 'Algo salio mal',
//             data: {}
//         });
//     }
// };
