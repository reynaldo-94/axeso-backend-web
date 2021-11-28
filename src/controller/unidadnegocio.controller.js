import { json, where } from 'sequelize';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import Unidadnegocio from '../models/unidadnegocio.model';

export async function getUnidadnegocioSelect(req, res) {
    try {
        let entidades = await Unidadnegocio.sequelize.query(
            "SELECT unidadnegocioid as id, nombre as descripcion FROM vunidadnegocio", {
                type: Unidadnegocio.sequelize.QueryTypes.SELECT,
            });
        console.log(entidades)
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