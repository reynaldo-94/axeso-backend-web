import { json, where } from 'sequelize';
import Subcanal from '../models/subcanal.model';

export async function getSubcanales(req, res) {
    try {
        let subcanales = await Subcanal.findAll();
        console.log(subcanales)
        if (subcanales) {
            return res.status(200).json({
                data: subcanales
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getSubcanal(req, res) {
    try {
        const { subcanalid } = req.params;
        let subcanal = await Subcanal.findOne({
            where: {
                subcanalid: subcanalid
            }
        });
        console.log(subcanal)
        if (subcanal) {
            return res.status(200).json({
                data: subcanal
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};