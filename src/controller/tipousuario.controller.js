import { json, where } from 'sequelize';
import Tipousuario from '../models/tipousuario.model';

export async function getTipousuarios(req, res) {
    try {
        let entidades = await Tipousuario.findAll();
        console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getTipousuariosSelect(req, res) {
    try {
        let entidades = await Tipousuario.findAll({
            attributes: [
                ['tipousuarioid', 'id'],
                ['nombre', 'descripcion']
            ]
        });
        //console.log(roles)
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};