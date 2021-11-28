import { json, where } from 'sequelize';
import Linea from '../models/linea.model';
import Proveedor from '../models/proveedor.model';

export async function getLineas(req, res) {
    try {
        let lineas = await Linea.findAll({
            attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
            include: [{
                attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: Proveedor,
                as: 'proveedor',
                required: true,
            }]
        });
        //console.log(lineas)
        if (lineas) {
            return res.status(200).json({
                data: lineas
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getLineasSelect(req, res) {
    try {
        let lineas = await Linea.findAll({
            attributes: [
                ['lineaid', 'id'],
                ['nombre', 'descripcion']
            ]
        });

        if (lineas) {
            return res.status(200).json({
                data: lineas
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getLineasProveedorSelect(req, res) {
    const { id } = req.body;
    try {
        let lineas = await Linea.findAll({
            attributes: [
                ['lineaid', 'id'],
                ['nombre', 'descripcion']
            ],
            where: {
                proveedorid: id
            }
        });

        if (lineas) {
            return res.status(200).json({
                data: lineas
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function getLinea(req, res) {
    try {
        const { id } = req.query;
        let linea = await Linea.findOne({
            attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
            include: [{
                attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: Proveedor,
                as: 'proveedor',
                required: true,
            }],
            where: {
                lineaid: id
            }
        });
        //console.log(linea)
        if (linea) {
            return res.status(200).json({
                data: linea
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getLineasProveedor(req, res) {
    try {
        const { id } = req.query;
        let linea = await Linea.findAll({
            attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
            include: [{
                attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: Proveedor,
                as: 'proveedor',
                required: true,
            }],
            where: {
                proveedorid: id
            }
        });
        //console.log(linea)
        if (linea) {
            return res.status(200).json({
                data: linea
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};