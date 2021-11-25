import { json, where } from 'sequelize';
import Proveedor from '../models/proveedor.model';
export async function getProveedores(req, res) {
    try {
        let entidades = await Proveedor.findAll({
            attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid']
        });
        //console.log(entidades)
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
export async function getProveedoresSelect(req, res) {
    try {
        let entidades = await Proveedor.findAll({
            attributes: [
                ['proveedorid', 'id'],
                ['nombre', 'descripcion']
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
export async function getProveedor(req, res) {
    const { proveedorid } = req.params;
    try {
        let entidades = await Proveedor.findOne({
            attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
            where: {
                proveedorid: proveedorid
            }
        });
        //console.log(entidades)
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