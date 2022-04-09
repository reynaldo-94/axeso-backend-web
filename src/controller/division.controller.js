import { json, where } from 'sequelize';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import Division from '../models/division.model';

export async function getDivisionSelect(req, res) {
    try {
        let entidades = await Division.sequelize.query(
            "SELECT divisionid as id, nombre as descripcion FROM vdivision", {
                type: Division.sequelize.QueryTypes.SELECT,
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