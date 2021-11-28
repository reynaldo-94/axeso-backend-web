import {
    json,
    where
} from 'sequelize';
var nodemailer = require('nodemailer');
import sequelize from 'sequelize';
import Usuario from '../models/usuario.model';
import Proveedor from '../models/proveedor.model';
import Tipousuario from '../models/tipousuario.model';
import Rol from '../models/rol.model';
import Motivobloqueo from '../models/motivobloqueo.model';
import Sesion from '../models/sesion.model';
import Usuariomenu from '../models/usuariomenu.model';
import Menu from '../models/menu.model';
import Rolmenusubmenu from '../models/rolmenusubmenu.model';
import Submenu from '../models/submenu.model';
import Usuariolinea from '../models/usuariolinea.model';
import Linea from '../models/linea.model';
var jwt = require('jsonwebtoken');
var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soporte.dimexa@gmail.com',
        pass: 'S0p0rt3D1m3xa'
    }
});
export async function getUsuarios(req, res) {
    try {
        let entidades = await Usuario.findAll({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true,
                },
                {
                    attributes: ['tipousuarioid', 'nombre'],
                    model: Tipousuario,
                    as: 'tipousuario',
                    required: true,
                },
                {
                    attributes: ['rolid', 'nombre'],
                    model: Rol,
                    as: 'rol',
                    required: true,
                },
                {
                    attributes: ['motivobloqueoid', 'nombre'],
                    model: Motivobloqueo,
                    as: 'motivobloqueo',
                    required: false,
                }
            ]
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
export async function getUsuario(req, res) {
    const {
        id
    } = req.query;
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true,
                },
                {
                    attributes: ['tipousuarioid', 'nombre'],
                    model: Tipousuario,
                    as: 'tipousuario',
                    required: true,
                },
                {
                    attributes: ['rolid', 'nombre'],
                    model: Rol,
                    as: 'rol',
                    required: true,
                },
                {
                    attributes: ['motivobloqueoid', 'nombre'],
                    model: Motivobloqueo,
                    as: 'motivobloqueo',
                    required: false,
                }
            ],
            where: {
                usuarioid: id
            }
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
        //console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function loginUsuario(req, res) {
    let urlavatarstring = String.raw `..\imagenes\usuarios\usr_usuarioid.png`;
    //console.log("urlavatarstring: ", urlavatarstring)
    let idusuario = 0;
    let rolidusuario = 0;
    let usuariosmenus;
    let menus;
    let nuevomenu = [];
    const {
        usuario,
        password
    } = req.body;
    var tokenData = {
        username: usuario
    }
    var token = jwt.sign(tokenData, "l7ltkfxrUber40KY1oxwHzE6", {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    })
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true,
                },
                {
                    attributes: ['tipousuarioid', 'nombre'],
                    model: Tipousuario,
                    as: 'tipousuario',
                    required: true,
                },
                {
                    attributes: ['rolid', 'nombre'],
                    model: Rol,
                    as: 'rol',
                    required: true,
                },
                {
                    attributes: ['motivobloqueoid', 'nombre'],
                    model: Motivobloqueo,
                    as: 'motivobloqueo',
                    required: false,
                },
            ],
            where: {
                usuario: usuario,
                password: password
            }
        });

        if (entidades) {
            idusuario = entidades.usuarioid;
            rolidusuario = entidades.rolid;
            usuariosmenus = await getRolmenus(rolidusuario);

            if (usuariosmenus) {
                var idmenus = [...new Set(usuariosmenus.map(item => item.menuid))];
                // var idmenus = usuariosmenus.map(function(item) {
                //     return item['menuid'];
                // });
            }
            console.log('idmenus: ', idmenus);
            let usumenu = JSON.parse(JSON.stringify(usuariosmenus));
            console.log("usumenu cont: ", Object.keys(usumenu).length);
            urlavatarstring = urlavatarstring.replace("usuarioid", entidades.usuarioid);
            //console.log("urlavatarstring: ", urlavatarstring)
            menus = await getMenus();
            if (menus) {
                menus.forEach(async menus => {
                    let contador = JSON.stringify(menus);
                    let estainsertado = 0;
                    let objecto = JSON.parse(contador);
                    let submenues = objecto.submenu;
                    let cantidadsubmenus = Object.keys(submenues).length;
                    if (cantidadsubmenus > 0) {
                        submenues.forEach(element => {
                            if (idmenus.indexOf(element.menuid) > -1) {
                                estainsertado = estainsertado + 1;
                            } else {
                                //console.log("no esta");
                            }
                        });
                        //console.log("estainsertado: ", estainsertado);
                        if (estainsertado > 0) {
                            let fnuevomenu = {
                                "menuid": objecto.menuid,
                                "titulo": objecto.titulo,
                                "descripcion": objecto.descripcion,
                                "icono": objecto.icono,
                                "ruta": objecto.ruta,
                                "parentid": objecto.parentid,
                                children: []
                            };
                            nuevomenu.push(fnuevomenu);
                            submenues.forEach(element => {
                                if (idmenus.indexOf(element.menuid) > -1) {
                                    let xnuevomenu = {
                                        "menuid": element.menuid,
                                        "titulo": element.titulo,
                                        "descripcion": element.descripcion,
                                        "icono": element.icono,
                                        "ruta": element.ruta,
                                        "parentid": element.parentid
                                    };
                                    //console.log("xnuevomenu: ", xnuevomenu);
                                    fnuevomenu.children.push(xnuevomenu);
                                } else {
                                    //console.log("no esta");
                                }
                            });
                        } else {

                        }
                    } else {}
                });


            }
            let bloqueado = entidades.bloqueado;
            let ingresos = entidades.ingresos;
            if (bloqueado == 0) {
                entidades.token = token;
                let newingresos = entidades.ingresos + 1;
                let newsesion = await InsertToSession(entidades.usuarioid);
                let toUpdate = {
                    "usuarioid": entidades.usuarioid,
                    "ingresos": newingresos
                };
                let upUsuario = await UpdateIngreso(toUpdate);
                entidades.idsesion = newsesion.sesionid;
                entidades.ingresos = newingresos;
                entidades.menu = nuevomenu;
                entidades.avatarurl = String.raw `${urlavatarstring}`;
                return res.status(200).json({
                    data: entidades,
                    // submenus: nuevomenu
                });
            } else {
                res.status(200).json('Usuario bloqueado, motivo: ' + entidades.motivobloqueo.nombre);
            }

        } else {
            res.status(200).json('Usuario o contraseña incorrectos')
        }
    } catch (e) {
        console.log('error: ' + e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

async function InsertToSession(valuesToInsert, res) {
    const usuarioid = valuesToInsert;
    //console.log(usuarioid);
    try {
        let newsesion = await Sesion.create({
            usuarioid: usuarioid,
            inicio: sequelize.literal('CURRENT_TIMESTAMP'),
            fin: sequelize.literal('CURRENT_TIMESTAMP')
        });
        if (newsesion) {
            return newsesion;
        }
    } catch (e) {
        console.log('insert: ' + e.message)
        return '';
    }
};

async function UpdateIngreso(valuesToInsert, res) {
    const usuarioid = valuesToInsert.usuarioid;
    const ingresos = valuesToInsert.ingresos;
    //console.log(usuarioid);
    try {
        const ingresosapp = await Usuario.findAll({
            attributes: ['usuarioid', 'ingresos'],
            where: {
                usuarioid: usuarioid
            }
        });
        //console.log('ingresosapp.lenght : ' + ingresosapp);
        ingresosapp.forEach(async ingresosapp => {
            await Usuario.update({
                ingresos: ingresos
            }, {
                where: {
                    usuarioid: usuarioid
                }
            });
        });
        return 1;
    } catch (e) {
        console.log('update: ' + e.message)
        return 0;
    }
};


export async function createUsuario(req, res) {
    const {
        usuario,
        descripcion,
        correo,
        proveedorid,
        tipousuarioid,
        rolid,
        password,
        telefono
    } = req.body;
    //console.log('values: ', usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, motivobloqueoid, password, telefono);
    try {
        let newentidad = await Usuario.create({
            usuario: usuario,
            descripcion: descripcion,
            correo: correo,
            proveedorid: proveedorid,
            tipousuarioid: tipousuarioid,
            rolid: rolid,
            estado: '1',
            bloqueado: '0',
            motivobloqueoid: 0,
            password: password,
            telefono: telefono,
            ingresos: 0,
            creado: sequelize.literal('CURRENT_TIMESTAMP'),
            actualizado: sequelize.literal('CURRENT_TIMESTAMP')
        });
        if (newentidad) {
            return res.status(200).json({
                message: 'Usuario creado',
                data: newentidad
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

export async function updateUsuario(req, res) {
    const {
        usuarioid,
        usuario,
        descripcion,
        correo,
        proveedorid,
        tipousuarioid,
        rolid,
        telefono,
        estado
    } = req.body;
    console.log(usuarioid);
    try {
        const found = await Usuario.findAll({
            attributes: ['usuarioid'],
            where: {
                usuarioid: usuarioid
            }
        });
        console.log('ingresosapp.lenght : ' + found);
        found.forEach(async found => {
            await Usuario.update({
                usuario: usuario,
                descripcion: descripcion,
                correo: correo,
                proveedorid: proveedorid,
                tipousuarioid: tipousuarioid,
                rolid: rolid,
                telefono: telefono,
                estado: estado,
                actualizado: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    usuarioid: usuarioid
                }
            });
        });
        return res.json({
            message: 'Usuario actualizado',
            data: found
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function updateEstadoUsuario(req, res) {
    const {
        usuarioid,
        estado
    } = req.body;
    //console.log(usuarioid);
    try {
        const found = await Usuario.findAll({
            attributes: ['usuarioid'],
            where: {
                usuarioid: usuarioid
            }
        });
        console.log('found.lenght : ' + found);
        found.forEach(async found => {
            await Usuario.update({
                estado: estado,
                actualizado: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    usuarioid: usuarioid
                }
            });
        });
        return res.json({
            message: 'Usuario actualizado',
            data: found
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function checkUsuario(req, res) {
    const {
        usuario
    } = req.body;
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true,
                },
                {
                    attributes: ['tipousuarioid', 'nombre'],
                    model: Tipousuario,
                    as: 'tipousuario',
                    required: true,
                },
                {
                    attributes: ['rolid', 'nombre'],
                    model: Rol,
                    as: 'rol',
                    required: true,
                },
                {
                    attributes: ['motivobloqueoid', 'nombre'],
                    model: Motivobloqueo,
                    as: 'motivobloqueo',
                    required: false,
                }
            ],
            where: {
                usuario: usuario
            }
        });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json('Usuario no existe');
        }
    } catch (e) {
        //console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function checkEmail(req, res) {
    const {
        correo
    } = req.body;
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                    attributes: ['id', 'proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                    model: Proveedor,
                    as: 'proveedor',
                    required: true,
                },
                {
                    attributes: ['tipousuarioid', 'nombre'],
                    model: Tipousuario,
                    as: 'tipousuario',
                    required: true,
                },
                {
                    attributes: ['rolid', 'nombre'],
                    model: Rol,
                    as: 'rol',
                    required: true,
                },
                {
                    attributes: ['motivobloqueoid', 'nombre'],
                    model: Motivobloqueo,
                    as: 'motivobloqueo',
                    required: false,
                }
            ],
            where: {
                correo: correo
            }
        });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades
            });
        } else {
            return res.status(200).json('Usuario no existe');
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function logoutUsuario(req, res) {
    const {
        sesionid
    } = req.body;
    //console.log(usuarioid);
    try {
        const found = await Sesion.findAll({
            attributes: ['sesionid'],
            where: {
                sesionid: sesionid
            }
        });
        console.log('found.lenght : ' + found);
        found.forEach(async found => {
            await Sesion.update({
                fin: sequelize.literal('CURRENT_TIMESTAMP')
            }, {
                where: {
                    sesionid: sesionid
                }
            });
        });
        return res.status(200).json('Cierre de sesion correcto');
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function blockUsuario(req, res) {
    const {
        correo,
        motivobloqueoid
    } = req.body;
    //console.log(usuarioid);
    try {
        const found = await Usuario.findAll({
            attributes: ['usuarioid'],
            where: {
                correo: correo
            }
        });
        console.log('found.lenght : ' + found);
        found.forEach(async found => {
            await Usuario.update({
                bloqueado: '1',
                motivobloqueoid: motivobloqueoid
            }, {
                where: {
                    usuarioid: found.usuarioid
                }
            });
        });
        return res.status(200).json('User bloqueado');
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function updateClaveUsuario(req, res) {
    const {
        usuario,
        password
    } = req.body;
    //console.log(usuarioid);
    try {
        const found = await Usuario.findAll({
            attributes: ['usuarioid'],
            where: {
                usuario: usuario
            }
        });
        console.log('found.lenght : ' + found);
        found.forEach(async found => {
            await Usuario.update({
                password: password
            }, {
                where: {
                    usuarioid: found.usuarioid
                }
            });
        });
        return res.status(200).json('Contraseña actualizada');
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
export async function updateClaveEmail(req, res) {
    const {
        correo,
        passwordencrip,
        password
    } = req.body;
    console.log('correo: ', correo);
    console.log('passwordencrip: ', passwordencrip);
    console.log('password: ', password);
    try {
        const found = await Usuario.findAll({
            attributes: ['usuarioid'],
            where: {
                correo: correo
            }
        });
        console.log('found.lenght : ' + found);
        found.forEach(async found => {
            await Usuario.update({
                password: passwordencrip
            }, {
                where: {
                    usuarioid: found.usuarioid
                }
            });
        });
        var mailOptions = {
            from: 'soporte.dimexa@gmail.com',
            to: correo,
            subject: 'Servicio de recuperacion de contraseña',
            html: 'La contraseña para el usuario con correo: <b>' + correo + '</b> ha sido modificada por <b>' + password + '</b>'
        };
        mail.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json('Contraseña actualizada');
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};

export async function getLineasusuario(req, res) {
    const {
        usuarioid
    } = req.body;
    try {
        let entidades = await Linea.findAll({
            attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
            include: [{
                attributes: ['id', 'usuarioid', 'lineaid'],
                where: {
                    usuarioid: usuarioid
                },
                model: Usuariolinea,
                as: 'usuariolinea',
                required: true,
            }]
        });
        //console.log(entidades)
        if (entidades) {
            return res.status(200).json({
                data: entidades,
            });
        } else {
            return res.status(200).json({
                data: {},
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
};
/******************************* funciones *********************************/


async function getUsuariomenus(req) {
    const id = req;
    try {
        let entidades = await Usuariomenu.findAll({
            attributes: ['id', 'usuarioid', 'menuid'],
            where: {
                usuarioid: id
            }
        });
        if (entidades) {
            return entidades;
        } else {
            return '';
        }
    } catch (e) {
        console.log(e.message)
        return '';
    }
};
async function getRolmenus(req) {
    const id = req;
    try {
        let entidades = await Rolmenusubmenu.sequelize.query(
            "SELECT rolid, nombre, submenuid, menuid from public.fn_get_rolsubmenu_rolid(" + id + ")", {
                type: Rolmenusubmenu.sequelize.QueryTypes.SELECT
            });
        if (entidades) {
            return entidades;
        } else {
            return '';
        }
    } catch (e) {
        console.log(e.message)
        return '';
    }
};
async function getMenus(req) {
    try {
        let entidad = await Menu.findAll({
            attributes: ['menuid', 'titulo', 'descripcion', 'icono', 'ruta', 'orden'],
            include: [{
                attributes: ['submenuid', 'menuid', 'titulo', 'descripcion', 'icono', 'ruta', 'orden'],
                model: Submenu,
                as: 'submenu',
                required: true,
            }]
        });
        console.log(entidad)
        if (entidad) {
            return entidad;
        } else {
            return '';
        }
    } catch (e) {
        console.log(e.message);
        return '';
    }
};