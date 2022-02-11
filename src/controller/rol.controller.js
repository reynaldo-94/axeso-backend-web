import { json, where } from 'sequelize';
import Rol from '../models/rol_web.model';

export async function getRoles(req, res) {
    try {
        let roles = await Rol.findAll();
        console.log(roles)
        if (roles) {
            return res.status(200).json({
                data: roles
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getRolesSelect(req, res) {
    try {
        let roles = await Rol.findAll({
            attributes: [
                ['rolid', 'id'],
                ['nombre', 'descripcion']
            ]
        });
        //console.log(roles)
        if (roles) {
            return res.status(200).json({
                data: roles
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getRol(req, res) {
    try {
        const { id } = req.query;
        console.log('rolid: ', id)
        let rol = await Rol.findOne({
            where: {
                rolid: id
            }
        });
        console.log(rol)
        if (rol) {
            return res.status(200).json({
                data: rol
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