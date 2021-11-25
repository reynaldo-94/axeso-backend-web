import { json, where } from 'sequelize';
import Sublinea from '../models/sublinea.model';
import Linea from '../models/linea.model';
import Proveedor from '../models/proveedor.model';

export async function getSublineas(req, res) {
    try {
        let sublineas = await Sublinea.findAll({
            attributes: ['id', 'sublineaid', 'lineaid', 'nombre'],
            include: [{
                attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
                model: Linea,
                as: 'linea',
                required: true,
                include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true
                }]
            }]
        });
        console.log(sublineas)
        if (sublineas) {
            return res.status(200).json({
                data: sublineas
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
export async function getSublinea(req, res) {
    try {
        const { id } = req.query;
        let sublineas = await Sublinea.findOne({
            attributes: ['id', 'sublineaid', 'lineaid', 'nombre'],
            include: [{
                attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
                model: Linea,
                as: 'linea',
                required: true,
                include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true
                }]
            }],
            where: {
                sublineaid: id
            }
        });
        console.log(sublineas)
        if (sublineas) {
            return res.status(200).json({
                data: sublineas
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
export async function getSublineasSelect(req, res) {
    try {
        let lineas = await Sublinea.findAll({
            attributes: [
                ['sublineaid', 'id'],
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
export async function getSublineasSelectLinea(req, res) {
    try {
        const { id } = req.query;
        let lineas = await Sublinea.findAll({
            attributes: [
                ['sublineaid', 'id'],
                ['nombre', 'descripcion']
            ],
            where: {
                lineaid: id
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