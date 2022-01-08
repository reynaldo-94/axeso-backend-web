import { json, where } from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Almacen from '../models/almacen.model';

export async function getAlmacenes(req, res) {
    try {
        let almacenes = await Almacen.findAll();
        //console.log(almacenes)
        if (almacenes) {
            return res.status(200).json({
                data: almacenes
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getAlmacenesSelect(req, res) {
    try {
        let almacenes = await Almacen.findAll({
            attributes: [
                ['almacenid', 'id'],
                ['nombre', 'descripcion']
            ]
        });
        //console.log(almacenes)
        if (almacenes) {
            return res.status(200).json({
                data: almacenes
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};


export async function getAlmacen(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.findOne({
            where: {
                almacenid: id
            }
        });
        //console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getAlmacenUnidadNegocio(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.findAll({
            where: {
                unidadnegocioid: id
            }
        });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getAlmacenUnidadNegocioSelect(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.findAll({
            attributes: [
                ['almacenid', 'id'],
                ['nombre', 'descripcion']
            ],
            where: {
                unidadnegocioid: id
            }
        });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getAlmacenUnidadNegocioSelectList(req, res) {
    try {
        const { id } = req.body;
        console.log("id: ", id)
        let almacen = await Almacen.findAll({
            attributes: [
                ['almacenid', 'id'],
                ['nombre', 'descripcion']
            ],
            where: {
                unidadnegocioid: {
                    [Op.in]: id,
                },
            }
        });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};