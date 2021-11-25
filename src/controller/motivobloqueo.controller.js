import { json, where } from 'sequelize';
import Motivobloqueo from '../models/motivobloqueo.model';

export async function getMotivobloqueos(req, res) {
    try {
        let motivobloqueos = await Motivobloqueo.findAll();
        console.log(motivobloqueos)
        if (motivobloqueos) {
            return res.status(200).json({
                data: motivobloqueos
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getMotivobloqueo(req, res) {
    try {
        const { id } = req.query;
        let motivobloqueo = await Motivobloqueo.findOne({
            where: {
                motivobloqueoid: id
            }
        });
        //console.log(motivobloqueo)
        if (motivobloqueo) {
            return res.status(200).json({
                data: motivobloqueo
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};