import { json, where } from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Almacen from '../models/almacen.model';

export async function getAlmacenes(req, res) {
    try {
        let almacenes = await Almacen.sequelize.query(
            "SELECT almacenid, unidadnegocioid, nombre, para_app, para_web FROM valmacen WHERE para_web = true;", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });
        //console.log(almacenes)
        if (almacenes) {
            return res.status(200).json({
                data: almacenes
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getAlmacenesSelect(req, res) {
    try {

        let almacenes = await Almacen.sequelize.query(
            "SELECT almacenid as id, nombre as descripcion FROM valmacen WHERE para_web = true;", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });

        //console.log(almacenes)
        if (almacenes) {
            return res.status(200).json({
                data: almacenes
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


export async function getAlmacen(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.sequelize.query(
            "SELECT almacenid, unidadnegocioid, nombre, para_app, para_web FROM valmacen WHERE para_web = true and almacenid = " + id + ";", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });


        //console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
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
export async function getAlmacenUnidadNegocio(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.sequelize.query(
            "SELECT almacenid, unidadnegocioid, nombre, para_app, para_web FROM valmacen WHERE  para_web = true and unidadnegocioid = '" + id + "';", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
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
export async function getAlmacenUnidadNegocioSelect(req, res) {
    try {
        const { id } = req.query;
        let almacen = await Almacen.sequelize.query(
            "SELECT almacenid as id, nombre as descripcion FROM valmacen WHERE  para_web = true and unidadnegocioid = '" + id + "';", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
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

export async function getAlmacenUnidadNegocioSelectListByVenc(req, res) {
    try {
        const { id } = req.body;
        let xid = null;
        if (id != null) {
            xid = "'" + id.join("','") + "'";
        }
        let almacen = await Almacen.sequelize.query(
            "SELECT idalmacen as id, nomalmacen as descripcion FROM public.almacen WHERE bactivo = true and idunineg in (" + xid + ");", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });
        if (almacen) {
            return res.status(200).json({
                data: almacen
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

export async function getAlmacenUnidadNegocioSelectList(req, res) {
    try {
        const { id } = req.body;
        console.log("id: ", id)
        let xid = null;
        if (id != null) {
            xid = "'" + id.join("','") + "'";
        }


        let almacen = await Almacen.sequelize.query(
            "SELECT almacenid as id, nombre as descripcion FROM valmacen WHERE  para_web = true and unidadnegocioid in (" + xid + ");", {
                type: Almacen.sequelize.QueryTypes.SELECT,
            });


        // let almacen = await Almacen.findAll({
        //     attributes: [
        //         ['almacenid', 'id'],
        //         ['nombre', 'descripcion']
        //     ],
        //     where: {
        //         unidadnegocioid: {
        //             [Op.in]: id,
        //         },
        //     }
        // });
        console.log(almacen)
        if (almacen) {
            return res.status(200).json({
                data: almacen
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