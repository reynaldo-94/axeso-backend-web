import {
    json,
    where
} from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Factura from '../models/factura.model';
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