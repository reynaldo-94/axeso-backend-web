import { json, where } from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
import Periodo from '../models/periodo.model';

export async function getPeriodos(req, res) {
    const { id } = req.query;
    try {
        let entidades = await Periodo.sequelize.query(
            "SELECT periodoid as id, periodoid as descripcion FROM fn_get_periodo('" + id + "')", {
                type: Periodo.sequelize.QueryTypes.SELECT,
                attributes: [
                    ['periodoid', 'id']
                ]
            });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
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
export async function getAnios(req, res) {
    const { id } = req.query;
    try {
        let entidades = await Periodo.sequelize.query(
            "SELECT anoid as id FROM fn_get_ano('" + id + "')", {
                type: Periodo.sequelize.QueryTypes.SELECT,
                attributes: [
                    ['periodoid', 'id']
                ]
            });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
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