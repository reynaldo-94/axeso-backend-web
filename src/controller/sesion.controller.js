import { json, where } from 'sequelize';
import Sesion from '../models/sesion.model';
import Usuario from '../models/usuario_web.model';

export async function getSesiones(req, res) {
    try {
        let entidades = await Sesion.findAll({
            attributes: ['usuarioid', 'sesionid', 'inicio', 'fin'],
            include: [{
                attributes: ['usuarioid', 'usuario', 'descripcion', 'correo'],
                model: Usuario,
                as: 'usuario',
                required: true,
            }]
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
export async function getSesion(req, res) {
    const { id } = req.query;
    try {
        let entidades = await Sesion.findAll({
            attributes: ['usuarioid', 'sesionid', 'inicio', 'fin'],
            include: [{
                attributes: ['usuarioid', 'usuario', 'descripcion', 'correo'],
                model: Usuario,
                as: 'usuario',
                required: true,
            }],
            where: {
                sesionid: id
            }
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