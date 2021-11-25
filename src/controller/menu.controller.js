import { json, where } from 'sequelize';
import Menu from '../models/menu.model';

export async function getMenus(req, res) {
    try {
        let entidad = await Menu.findAll({
            attributes: ['menuid', 'titulo', 'descripcion', 'icono', 'ruta', 'parentid'],
            include: [{ all: true, nested: true }]
        });
        console.log(entidad)
        if (entidad) {
            return res.status(200).json({
                data: entidad
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
export async function getMenu(req, res) {
    try {
        let entidad = await Menu.findAll({
            attributes: ['menuid', 'titulo', 'descripcion', 'icono', 'ruta', 'parentid'],
            include: [{
                all: true,
                nested: true,
                where: {
                    menuid: 18
                }
            }]
        });
        console.log(entidad)
        if (entidad) {
            return res.status(200).json({
                data: entidad
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