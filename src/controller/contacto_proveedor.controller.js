import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Contacto_proveedor from '../models/contacto_proveedor.model';

export async function getContactosProveedor(req, res) {
    try {
        let entidades = await Contacto_proveedor.findAll();
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
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getContactoProveedorId(req, res) {
    try {
        const { id } = req.body;
        let entidad = await Contacto_proveedor.findOne({
            where: {
                id: id
            }
        });
        if (entidad) {
            return res.status(200).json({
                data: entidad
            });
        } else {
            return res.status(200).json({
                data: {}
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

export async function getContactosProveedorProvId(req, res) {
    try {
        const { id } = req.body;
        let entidad = await Contacto_proveedor.findAll({
            where: {
                proveedorid: id
            }
        });
        if (entidad) {
            return res.status(200).json({
                data: entidad
            });
        } else {
            return res.status(200).json({
                data: {}
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

export async function deleteContactosProveedor(req, res) {
    const {
        id
    } = req.body;
    try {
        let entidad = await Contacto_proveedor.findOne({
            where: {
                id: id
            }
        });
        console.log("entidad: ", entidad)
        if (entidad != 'null') {
            let deleted = await Contacto_proveedor.destroy({
                where: {
                    id: id
                }
            });
            if (deleted === 1) {
                res.status(200).json({
                    message: "Registro eliminado",
                    data: {}
                });
            } else {
                res.status(200).json({
                    message: "Registro no encontrado",
                    data: {}
                });
            }
        } else {
            return res.status(200).json({
                message: 'No se pudo eliminar',
                data: {}
            });
        }
    } catch (e) {
        console.log('insert: ' + e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function InsertToContactoProveedor(req, res) {
    const {
        proveedorid,
        nombre,
        cargo,
        correo,
        area,
        celular,
        unidadnegocioid,
        informacionadiconal
    } = req.body;
    try {
        let newentidad = await Contacto_proveedor.create({
            proveedorid: proveedorid,
            nombre: nombre,
            cargo: cargo,
            correo: correo,
            area: area,
            celular: celular,
            unidadnegocioid: unidadnegocioid,
            informacionadiconal: informacionadiconal
        });
        if (newentidad) {
            return res.status(200).json({
                data: newentidad
            });
        } else {
            return res.status(401).json({
                data: {}
            });
        }
    } catch (e) {
        console.log('insert: ' + e.message)
        return '';
    }
};

export async function updateContactoProveedor(req, res) {
    const {
        id,
        proveedorid,
        nombre,
        cargo,
        correo,
        area,
        celular,
        unidadnegocioid,
        informacionadiconal
    } = req.body;
    try {
        let entidad = await Contacto_proveedor.findOne({
            where: {
                id: id
            }
        });
        if (entidad != 'null') {
            await Contacto_proveedor.update({
                proveedorid: proveedorid,
                nombre: nombre,
                cargo: cargo,
                correo: correo,
                area: area,
                celular: celular,
                unidadnegocioid: unidadnegocioid,
                informacionadiconal: informacionadiconal
            }, {
                where: {
                    id: id
                }
            });
        } else {
            return res.status(200).json({
                message: 'Registro no encontrado',
                data: {}
            });
        };
        let entidad2 = await Contacto_proveedor.findOne({
            where: {
                id: id
            }
        });
        return res.json({
            message: 'Registro actualizado',
            data: entidad2
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};