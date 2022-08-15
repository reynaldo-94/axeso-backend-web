import { json, where } from 'sequelize';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import Zona from '../models/zona.model';


export async function getZonaBySedeSelect(req, res) {
    const { unidadnegocioid } = req.body;
    try {
        let xunidadnegocioid = null;
        if (unidadnegocioid == '') {
            let entidades = await Zona.sequelize.query(
                "SELECT zonaid as id, nombre as descripcion FROM vzona WHERE bactivo = true;", {
                    type: Zona.sequelize.QueryTypes.SELECT,
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
        } else if ((unidadnegocioid != null) || (unidadnegocioid != undefined)) {
            xunidadnegocioid = "'" + unidadnegocioid + "'";
            let entidades = await Zona.sequelize.query(
                "SELECT zonaid as id, nombre as descripcion FROM vzona WHERE unidadnegocioid = " + xunidadnegocioid + " AND bactivo = true;", {
                    type: Zona.sequelize.QueryTypes.SELECT,
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
        } else {
            let entidades = await Zona.sequelize.query(
                "SELECT zonaid as id, nombre as descripcion FROM vzona WHERE bactivo = true;", {
                    type: Zona.sequelize.QueryTypes.SELECT,
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
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};