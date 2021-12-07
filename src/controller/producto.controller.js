import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Producto from '../models/producto.model';
import Proveedor from '../models/proveedor.model';
import Sublinea from '../models/sublinea.model';
import Linea from '../models/linea.model';
import Sellout_producto from '../models/sellout_producto.model';

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

export async function getSelloutProductoMes(req, res) {
    const {
        p_proveedorid,
        p_ano,
        p_medida,
        p_unidadnegocioid,
        p_divisionid,
        p_lineaid,
        p_sublineaid,
        p_zonaid,
        p_ruc,
        p_clienteid
    } = req.body;
    try {
        let xp_proveedorid = null;
        if ((p_proveedorid != null) || (p_proveedorid != undefined)) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        let xp_ano = null;
        if ((p_ano != null) || (p_ano != undefined)) {
            xp_ano = "'" + p_ano + "'";
        }
        let xp_medida = null;
        if ((p_medida != null) || (p_medida != undefined)) {
            xp_medida = "'" + p_medida + "'";
        }
        let xp_unidadnegocioid = null;
        if ((p_unidadnegocioid != null) || (p_unidadnegocioid != undefined)) {
            xp_unidadnegocioid = "'" + p_unidadnegocioid + "'";
        }
        let xp_divisionid = null;
        if ((p_divisionid != null) || (p_divisionid != undefined)) {
            xp_divisionid = "'" + p_divisionid + "'";
        }
        let xp_lineaid = null;
        if ((p_lineaid != null) || (p_lineaid != undefined)) {
            xp_lineaid = "'" + p_lineaid + "'";
        }
        let xp_sublineaid = null;
        if ((p_sublineaid != null) || (p_sublineaid != undefined)) {
            xp_sublineaid = "'" + p_sublineaid + "'";
        }
        let xp_zonaid = null;
        if ((p_zonaid != null) || (p_zonaid != undefined)) {
            xp_zonaid = "'" + p_zonaid + "'";
        }
        let xp_ruc = null;
        if ((p_ruc != null) || (p_ruc != undefined)) {
            xp_ruc = "'" + p_ruc + "'";
        }
        let xp_clienteid = null;
        if ((p_clienteid != null) || (p_clienteid != undefined)) {
            xp_clienteid = "'" + p_ruc + "'";
        }
        let entidades = await Sellout_producto.sequelize.query(
            "SELECT * from fn_get_sellout_producto_mes(" + xp_proveedorid + "," + xp_ano + "," + xp_medida + "," + xp_unidadnegocioid + "," + xp_divisionid + "," + xp_lineaid + "," +
            xp_sublineaid + "," + xp_zonaid + "," + xp_ruc + "," + xp_clienteid + ")", {
                type: Sellout_producto.sequelize.QueryTypes.SELECT,
            });
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json({
                data: {}
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