import {
    json,
    where
} from 'sequelize';
import Cliente from '../models/cliente.model';
import Ubigeo from '../models/ubigeo.model';
import Sequelize from 'sequelize';
import sequelize from 'sequelize';
const Op = Sequelize.Op;
import Sellout from '../models/sellout.model'
import Selloutmes from '../models/selloutmes.model';
import Vunidadnegocio from '../models/vunidadnegocio.model';
import Vzona from '../models/vzona.model';

export async function getClientes(req, res) {
    try {
        let entidades = await Cliente.findAll({
            attributes: ['id', 'clienteid', 'unidadnegocioid', 'ruc', 'razonsocial', 'nombrecomercial', 'zonaid', 'ubigeoid', 'direccion'],
            include: [{
                attributes: ['id', 'ubigeoid', 'nombre', 'departamentoid', 'provinciaid', 'distritoid', 'departamento', 'provincia'],
                model: Ubigeo,
                as: 'ubigeo',
                required: true
            }]
        });
        //console.log(entidades)
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
export async function getClientesPage(req, res) {
    const {
        limite,
        pagina
    } = req.body;
    try {
        let entidades = await Cliente.findAll({
            attributes: ['id', 'clienteid', 'unidadnegocioid', 'ruc', 'razonsocial', 'nombrecomercial', 'zonaid', 'ubigeoid', 'direccion'],
            include: [{
                attributes: ['id', 'ubigeoid', 'nombre', 'departamentoid', 'provinciaid', 'distritoid', 'departamento', 'provincia'],
                model: Ubigeo,
                as: 'ubigeo',
                required: true
            }],
            limit: limite,
            offset: pagina
        });
        //console.log(entidades)
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

export async function getClientesUbigeoPage(req, res) {
    const {
        limite,
        pagina,
        ubigeoid
    } = req.body;
    try {
        let entidades = await Cliente.findAll({
            attributes: ['id', 'clienteid', 'unidadnegocioid', 'ruc', 'razonsocial', 'nombrecomercial', 'zonaid', 'ubigeoid', 'direccion'],
            include: [{
                attributes: ['id', 'ubigeoid', 'nombre', 'departamentoid', 'provinciaid', 'distritoid', 'departamento', 'provincia'],
                model: Ubigeo,
                as: 'ubigeo',
                required: true
            }],
            where: {
                ubigeoid: ubigeoid
            },
            limit: limite,
            offset: pagina
        });
        //console.log(entidades)
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
export async function getClientesZonaPage(req, res) {
    const {
        limite,
        pagina,
        zonaid
    } = req.body;
    try {
        let entidades = await Cliente.findAll({
            attributes: ['id', 'clienteid', 'unidadnegocioid', 'ruc', 'razonsocial', 'nombrecomercial', 'zonaid', 'ubigeoid', 'direccion'],
            include: [{
                attributes: ['id', 'ubigeoid', 'nombre', 'departamentoid', 'provinciaid', 'distritoid', 'departamento', 'provincia'],
                model: Ubigeo,
                as: 'ubigeo',
                required: true
            }],
            where: {
                zonaid: zonaid
            },
            limit: limite,
            offset: pagina
        });
        //console.log(entidades)
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
export async function getClientesNombrePage(req, res) {
    const {
        limite,
        pagina,
        razonsocial
    } = req.body;
    try {
        let entidades = await Cliente.findAll({
            attributes: [
                ['clienteid', 'id'],
                [sequelize.fn('COALESCE', sequelize.col('nombrecomercial'), sequelize.col('razonsocial')), 'descripcion'],
            ],
            where: {
                razonsocial: {
                    [Op.like]: razonsocial + '%',
                },
            },
            limit: limite,
            offset: pagina
        });
        //console.log(entidades)
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

export async function getClientesSelect(req, res) {
    try {
        let entidades = await Cliente.findAll({
            attributes: [
                ['clienteid', 'id'],
                [sequelize.fn('COALESCE', sequelize.col('nombrecomercial'), sequelize.col('razonsocial')), 'descripcion'],
            ]
        });
        //console.log(entidades)
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

export async function getSelloutClientes(req, res) {
    const {
        p_proveedorid,
        p_unidadnegocioid,
        p_divisionid,
        p_lineaid,
        p_sublineaid,
        p_productoid,
        p_periodoid,
        p_desde,
        p_hasta
    } = req.body;
    try {
        let xp_proveedorid = null;
        if ((p_proveedorid != null) || (p_proveedorid != undefined)) {
            xp_proveedorid = "'" + p_proveedorid + "'";
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
        let xp_productoid = null;
        if ((p_productoid != null) || (p_productoid != undefined)) {
            xp_productoid = "'" + p_productoid + "'";
        }
        let xdesde = null;
        if ((p_desde != null) || (p_desde != undefined)) {
            xdesde = "'" + p_desde + "'";
        }
        let xhasta = null;
        if ((p_hasta != null) || (p_hasta != undefined)) {
            xhasta = "'" + p_hasta + "'";
        }
        let xp_periodoid = null;
        if ((p_periodoid != null) || (p_periodoid != undefined)) {
            xp_periodoid = "'" + p_periodoid + "'";
        }
        let entidades = await Sellout.sequelize.query(
            "SELECT * from fn_get_sellout_cliente(" + xp_proveedorid + "," + xp_unidadnegocioid + "," + xp_divisionid + "," + xp_lineaid + "," + xp_sublineaid + "," + xp_productoid + "," +
            xp_periodoid + "," + xdesde + "," + xhasta + ")", {
                type: Sellout.sequelize.QueryTypes.SELECT,
            });
        //console.log(entidades)
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

export async function getSelloutClientesmes(req, res) {
    const {
        p_proveedorid,
        p_ano,
        p_medida,
        p_unidadnegocioid,
        p_divisionid,
        p_lineaid,
        p_sublineaid,
        p_productoid,
        p_departamento
    } = req.body;
    try {
        let xp_proveedorid = null;
        if (p_proveedorid != null) {
            xp_proveedorid = "'" + p_proveedorid + "'";
        }
        let xp_ano = null;
        if (p_ano != null) {
            xp_ano = "'" + p_ano + "'";
        }
        let xp_medida = null;
        if (p_medida != null) {
            xp_medida = "'" + p_medida + "'";
        }
        let xp_unidadnegocioid = null;
        if (p_unidadnegocioid != null) {
            xp_unidadnegocioid = "'" + p_unidadnegocioid + "'";
        }
        let xp_divisionid = null;
        if (p_divisionid != null) {
            xp_divisionid = "'" + p_divisionid + "'";
        }
        let xp_lineaid = null;
        if (p_lineaid != null) {
            xp_lineaid = "'" + p_lineaid + "'";
        }
        let xp_sublineaid = null;
        if (p_sublineaid != null) {
            xp_sublineaid = "'" + p_sublineaid + "'";
        }
        let xp_productoid = null;
        if (p_productoid != null) {
            xp_productoid = "'" + p_productoid + "'";
        }
        let xp_departamento = null;
        if (p_departamento != null) {
            xp_departamento = "'" + p_departamento + "'";
        }
        let entidades = await Selloutmes.sequelize.query(
            "SELECT * from fn_get_sellout_cliente_mes(" + xp_proveedorid + "," + xp_ano + "," + xp_medida + "," + xp_unidadnegocioid + "," + xp_divisionid + "," +
            xp_lineaid + "," + xp_sublineaid + "," + xp_productoid + "," + xp_departamento + ")", {
                type: Selloutmes.sequelize.QueryTypes.SELECT,
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

export async function getClientesProveedor(req, res) {
    const {
        p_proveedorid,
        p_zonaid,
        p_nombre,
        p_departamento,
        p_provincia
    } = req.body;
    try {
        if (p_proveedorid == null) {
            return res.status(200).json("Valor de proveedorid es obligatorio");
        }
        let xp_zonaid = null;
        if (p_zonaid != null) {
            xp_zonaid = "'" + p_zonaid + "'";
        }
        let xp_nombre = null;
        if (p_nombre != null) {
            xp_nombre = "'" + p_nombre + "'";
        }
        let xp_departamento = null;
        if (p_departamento != null) {
            xp_departamento = "'" + p_departamento + "'";
        }
        let xp_provincia = null;
        if (p_provincia != null) {
            xp_provincia = "'" + p_provincia + "'";
        }
        let entidades = await Cliente.sequelize.query(
            "SELECT * from fn_get_cliente('" + p_proveedorid + "'," + xp_zonaid + "," + xp_nombre + "," + xp_departamento + "," + xp_provincia + ")", {
                type: Cliente.sequelize.QueryTypes.SELECT,
            });
        console.log(entidades)
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
export async function getClienteRuc(req, res) {
    const {
        ruc
    } = req.body;
    let sid = "''";
    try {
        sid = ruc.join(",");
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {

        let entidades = await Sellout.sequelize.query(
            "SELECT * from fn_get_cliente(null,'" + sid + "',null,null)", {
                type: Sellout.sequelize.QueryTypes.SELECT,
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

export async function getClienteRucCodigo(req, res) {
    const {
        id
    } = req.body;
    let sid = "''";
    try {
        sid = id.join(",");
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        console.log("id.length: ", id[0].length);
        if (id[0].length == 11) {
            let entidades = await Sellout.sequelize.query(
                "SELECT * from fn_get_cliente(null," + sid + ",null,null)", {
                    type: Sellout.sequelize.QueryTypes.SELECT,
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
        } else if (id[0].length == 6) {
            let entidades = await Sellout.sequelize.query(
                "SELECT * from fn_get_cliente('" + sid + "',null,null,null)", {
                    type: Sellout.sequelize.QueryTypes.SELECT,
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

export async function getCliente(req, res) {
    const { clienteid } = req.body;
    let sid = "''";
    try {
        sid = clienteid.join(",");
    } catch (error) {
        console.log(error.message)
        sid = "''";
    }
    try {
        let entidades = await Sellout.sequelize.query(
            "SELECT * from fn_get_cliente('" + sid + "',null,null,null)", {
                type: Sellout.sequelize.QueryTypes.SELECT,
            });

        // let entidades = await Cliente.findOne({
        //     attributes: ['id', 'clienteid', 'unidadnegocioid', 'ruc', 'razonsocial', 'nombrecomercial', 'zonaid', 'ubigeoid', 'direccion'],
        //     include: [{
        //             attributes: ['id', 'ubigeoid', 'nombre', 'departamentoid', 'provinciaid', 'distritoid', 'departamento', 'provincia'],
        //             model: Ubigeo,
        //             as: 'ubigeo',
        //             required: true
        //         },
        //         {
        //             attributes: ['empresaid', 'unidadnegocioid', 'nombre', 'abreviatura', 'ciudad', 'activo'],
        //             model: Vunidadnegocio,
        //             as: 'vunidadnegocio',
        //             required: true
        //         },
        //         {
        //             attributes: ['zonaid', 'nombre', 'vendedorid', 'canalid', 'subcanalid', 'unidadnegocioid', 'activo'],
        //             model: Vzona,
        //             as: 'vzona',
        //             required: true
        //         }
        //     ],
        //     where: {
        //         clienteid: clienteid
        //     }
        // });
        //console.log(entidades)
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