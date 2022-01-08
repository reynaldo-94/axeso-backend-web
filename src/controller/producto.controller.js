import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Producto from '../models/producto.model';
import Proveedor from '../models/proveedor.model';
import Sublinea from '../models/sublinea.model';
import Linea from '../models/linea.model';
import Sellout_producto from '../models/sellout_producto.model';
import Stockproducto from '../models/stockproducto.model';
import Vvencimiento from '../models/vvencimiento.model';
import Inventariovencimiento from '../models/inventariovencimiento.model';
import Inventarioporvencimiento from '../models/inventarioporvencimiento.model';

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

export async function getStockProducto(req, res) {
    const {
        p_proveedorid,
        p_divisiones,
        p_sedes,
        p_almacenes,
        p_lineas,
        p_sublineas,
        p_tipovalorid
    } = req.body;
    try {
        let xp_proveedorid = null;
        if ((p_proveedorid != null) || (p_proveedorid != undefined)) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        let xp_divisiones = null;
        if (p_divisiones != null) {
            xp_divisiones = "'" + p_divisiones.join(",") + "'";
        }
        let xp_sedes = null;
        if (p_sedes != null) {
            xp_sedes = "'" + p_sedes.join(",") + "'";
        }
        let xp_almacenes = null;
        if (p_almacenes != null) {
            xp_almacenes = "'" + p_almacenes.join(",") + "'";
        }
        let xp_lineas = null;
        if (p_lineas != null) {
            xp_lineas = "'" + p_lineas.join(",") + "'";
        }
        let xp_sublineas = null;
        if (p_sublineas != null) {
            xp_sublineas = "'" + p_sublineas.join(",") + "'";
        }

        let xp_tipovalorid = null;
        if ((p_tipovalorid != null) || (p_tipovalorid != undefined)) {
            xp_tipovalorid = "'" + p_tipovalorid + "'";
        }
        let entidades = await Stockproducto.sequelize.query(
            "SELECT * from fn_get_stock_producto(" + xp_proveedorid + "," + xp_divisiones + "," + xp_sedes + "," + xp_almacenes + "," + xp_lineas + "," + xp_sublineas + "," +
            xp_tipovalorid + ")", {
                type: Stockproducto.sequelize.QueryTypes.SELECT,
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

export async function getVvencimiento(req, res) {
    try {
        let entidades = await Vvencimiento.sequelize.query(
            "SELECT vencimientoid, desde, hasta, nombre FROM axeso.vvencimiento", {
                type: Vvencimiento.sequelize.QueryTypes.SELECT,
            });
        console.log(entidades)
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

export async function getInventariovencimientoResumen(req, res) {
    const {
        p_proveedorid
    } = req.body;
    try {
        let xp_proveedorid = null;
        if ((p_proveedorid != null) || (p_proveedorid != undefined)) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        let entidades = await Inventariovencimiento.sequelize.query(
            "SELECT * from fn_get_inventario_por_vencimiento_resumen(" + xp_proveedorid + ")", {
                type: Inventariovencimiento.sequelize.QueryTypes.SELECT,
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

export async function getInventariovencimiento(req, res) {
    const {
        p_proveedorid,
        p_divisiones,
        p_sedes,
        p_almacenes,
        p_lineas,
        p_sublineas,
        p_vencimientoid
    } = req.body;
    try {
        let xp_proveedorid = null;
        if ((p_proveedorid != null) || (p_proveedorid != undefined)) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        let xp_divisiones = null;
        if (p_divisiones != null) {
            xp_divisiones = "'" + p_divisiones.join(",") + "'";
        }
        let xp_sedes = null;
        if (p_sedes != null) {
            xp_sedes = "'" + p_sedes.join(",") + "'";
        }
        let xp_almacenes = null;
        if (p_almacenes != null) {
            xp_almacenes = "'" + p_almacenes.join(",") + "'";
        }
        let xp_lineas = null;
        if (p_lineas != null) {
            xp_lineas = "'" + p_lineas.join(",") + "'";
        }
        let xp_sublineas = null;
        if (p_sublineas != null) {
            xp_sublineas = "'" + p_sublineas.join(",") + "'";
        }
        let xp_vencimientoid = null;
        if ((p_vencimientoid != null) || (p_vencimientoid != undefined)) {
            xp_vencimientoid = "'" + p_vencimientoid + "'";
        }
        let entidades = await Inventarioporvencimiento.sequelize.query(
            "SELECT * from get_inventario_por_vencimiento(" + xp_proveedorid + "," + xp_divisiones + "," + xp_sedes + "," + xp_almacenes + "," + xp_lineas + "," + xp_sublineas + "," + xp_vencimientoid + ")", {
                type: Inventarioporvencimiento.sequelize.QueryTypes.SELECT,
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