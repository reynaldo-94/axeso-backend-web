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