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
        console.log(xp_proveedorid)
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await Documento.sequelize.query(
            "SELECT * from fn_docs_tipo_documento(" + xp_proveedorid + ",'" + p_tipo_documento + "'," + xp_unidadnegocioid + "," + xp_lineaid + ")", {
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

export async function getAmortizacionCuentaPagar(req, res) {
    const { p_tipo_documento, p_serie, p_numero } = req.body;
    let sid = "''";

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