import {
    json,
    where
} from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Factura from '../models/factura.model';
import Documento from '../models/documento.model';
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
    const { p_proveedorid, p_tipo_documento } = req.body;
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
        let entidades = await Documento.sequelize.query(
            "SELECT * from fn_docs_tipo_documento(" + xp_proveedorid + ",'" + p_tipo_documento + "')", {
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