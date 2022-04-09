import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Contacto_dimexa from '../models/contacto_dimexa.model';

export async function getContactosDimexa(req, res) {
    try {
        let entidades = await Contacto_dimexa.findAll();
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

export async function getContactoDimexaId(req, res) {
    try {
        const { id } = req.body;
        let entidad = await Contacto_dimexa.findOne({
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


export async function deleteContactosDimexa(req, res) {
    const {
        id
    } = req.body;
    try {
        let entidad = await Contacto_dimexa.findOne({
            where: {
                id: id
            }
        });
        console.log("entidad: ", entidad)
        if (entidad != 'null') {
            let deleted = await Contacto_dimexa.destroy({
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
                res.status(400).json({
                    message: "Registro no encontrado",
                    data: {}
                });
            }
        } else {
            return res.status(400).json({
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

export async function InsertToContactoDimexa(req, res) {
    const {
        nombre,
        cargo,
        correo,
        area,
        celular,
        unidadnegocioid,
        informacionadiconal
    } = req.body;
    try {
        let newentidad = await Contacto_dimexa.create({
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

export async function updateContactoDimexa(req, res) {
    const {
        id,
        nombre,
        cargo,
        correo,
        area,
        celular,
        unidadnegocioid,
        informacionadiconal
    } = req.body;
    try {
        let entidad = await Contacto_dimexa.findOne({
            where: {
                id: id
            }
        });
        if (entidad != 'null') {
            await Contacto_dimexa.update({
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
        let entidad2 = await Contacto_dimexa.findOne({
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