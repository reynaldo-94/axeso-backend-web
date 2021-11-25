import { json, where } from 'sequelize';
import Ubigeo from '../models/ubigeo.model';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
export async function getUbigeos(req, res) {
    try {
        let ubigeos = await Ubigeo.findAll();
        console.log(ubigeos)
        if (ubigeos) {
            return res.status(200).json({
                data: ubigeos
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getUbigeo(req, res) {
    try {
        const { ubigeoid } = req.params;
        let ubigeo = await Ubigeo.findOne({
            where: {
                ubigeoid: ubigeoid
            }
        });
        console.log(ubigeo)
        if (ubigeo) {
            return res.status(200).json({
                data: ubigeo
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getDepartamentos(req, res) {
    try {
        let ubigeos = await Ubigeo.findAll({
            attributes: ['departamentoid', 'departamento'],
            order: ['departamento'],
            group: ['departamentoid', 'departamento'],
            where: {
                departamento: {
                    [Op.not]: null, // Like: sellDate IS NOT NULL
                },
            }
        });
        console.log(ubigeos)
        if (ubigeos) {
            return res.status(200).json({
                data: ubigeos
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

export async function getDepartamentosSelect(req, res) {
    try {
        let ubigeos = await Ubigeo.findAll({
            attributes: [
                ['departamentoid', 'id'],
                ['departamento', "descripcion"]
            ],
            order: ['departamento'],
            group: ['departamentoid', 'departamento'],
            where: {
                departamento: {
                    [Op.not]: null, // Like: sellDate IS NOT NULL
                },
            }
        });
        console.log(ubigeos)
        if (ubigeos) {
            return res.status(200).json({
                data: ubigeos
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