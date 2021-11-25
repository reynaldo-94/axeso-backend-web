import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Producto from '../models/producto.model';
import Proveedor from '../models/proveedor.model';
import Sublinea from '../models/sublinea.model';
import Linea from '../models/linea.model';

export async function getProductosSelectProveedor(req, res) {
    const { id } = req.query;
    try {
        let entidades = await Producto.findAll({
            attributes: ['id', [
                sequelize.fn('CONCAT',
                    sequelize.col('producto.productoid'), ' ',
                    sequelize.col('producto.nombre')),
                'descripcion'
            ]],
            include: [{
                attributes: [],
                model: Sublinea.scope(null),
                as: 'sublinea',
                required: true,
                include: [{
                    attributes: [],
                    model: Linea.scope(null),
                    as: 'linea',
                    required: true,
                    where: {
                        proveedorid: id
                    }
                }]
            }],
        });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
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