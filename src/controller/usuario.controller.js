
import {
    json,
    where
} from 'sequelize';
import Sequelize from 'sequelize';
var nodemailer = require('nodemailer');
import sequelize from 'sequelize';
import Usuario from '../models/usuario_web.model';
import Proveedor from '../models/proveedor.model';
import VProveedor from '../models/vproveedor.model';
import Tipousuario from '../models/tipousuario.model';
import Rol from '../models/rol_web.model';
import Motivobloqueo from '../models/motivobloqueo.model';
import Sesion from '../models/sesion.model';
import Usuariomenu from '../models/usuariomenu.model';
import Menu from '../models/menu.model';
import Rolmenusubmenu from '../models/rolmenusubmenu.model';
import Submenu from '../models/submenu.model';
import Usuariolinea from '../models/usuario_weblinea.model';
//import Linea from '../models/linea.model';
import Linea from '../models/vlinea.model';
import { JWT } from '../config/jwt';
//const CryptoJS = require("../utils/aes");
var CryptoJS = require("crypto-js");
//declare var CryptoJS: any;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var mail = nodemailer.createTransport({
    // service: "gmail",
    host: "outlook.office365.com",
    port: 587,
    secure: false,
    auth: {
        // user: "soporte.dimexa@gmail.com",
        // pass: "S0p0rt3D1m3xa",
        user: "contactadimexa@dimexa.com.pe",
        pass: "CCD+*963."
    }
});


function encryptData(data) {
    const iv = '';
    const hash = '';
    const _iv = CryptoJS.enc.Base64.parse(iv); //dando vector de inicialización vacío
    const _hash = CryptoJS.SHA256(hash); //hash de la clave usando SHA256 ("dimexa")
    let encryptedString = '';
    if (typeof data == 'string') {
        data = data.slice();
        encryptedString = CryptoJS.AES.encrypt(data, _hash, {
            iv: _iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
    } else {
        encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), _hash, {
            iv: _iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
    }
    return encryptedString.toString();
}

export async function getUsuarios(req, res) {
    var myString = "https://www.titanesmedellin.com/";
    var myPassword = "09876";


    // PROCESS

    var nuevoentidad = [];
    try {
        let entidades = await Usuario.findAll({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                attributes: ['proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: VProveedor,
                as: 'vproveedor',
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
                as: 'rol_web',
                required: true,
            },
            {
                attributes: ['motivobloqueoid', 'nombre'],
                model: Motivobloqueo,
                as: 'motivobloqueo',
                required: false,
            },
            ]
        });
        //console.log(entidades)
        nuevoentidad = [];
        if (entidades) {
            for (const element of entidades) {
                let lineast = await getLineasUsuarioSelect(element.usuarioid);
                //console.log("lineast: ", lineast);
                element.linea = lineast;

                nuevoentidad.push(element);
                console.log("dentro: ");

            }
            console.log("element: ", JSON.stringify(nuevoentidad));
            return res.status(200).json({
                data: nuevoentidad
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
export async function getUsuario(req, res) {
    const {
        id
    } = req.body;
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            include: [{
                attributes: ['proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: VProveedor,
                as: 'vproveedor',
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
                as: 'rol_web',
                required: true,
            },
            {
                attributes: ['motivobloqueoid', 'nombre'],
                model: Motivobloqueo,
                as: 'motivobloqueo',
                required: false,
            },
                // {
                //     attributes: ['id', 'usuarioid', 'lineaid'],
                //     model: Usuariolinea,
                //     as: 'usuariolinea',
                //     required: false,
                //     include: [{
                //         attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
                //         model: Linea,
                //         as: 'linea',
                //         required: true
                //     }]
                // }
            ],
            where: {
                usuarioid: id
            }
        });
        //console.log(entidades)
        if (entidades) {
            let lineast = await getLineasUsuarioSelect(id);
            entidades.linea = lineast;
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

export async function loginUsuario(req, res) {
    let urlavatarstring = String.raw`..\imagenes\usuarios\usr_usuarioid.png`;
    //console.log("urlavatarstring: ", urlavatarstring)
    let idusuario = 0;
    let rolidusuario = 0;
    let usuariosmenus;
    let menus;
    let nuevomenu = [];
    const { usuario, password } = req.body;
    var tokenData = {
        username: usuario,
    };
    var token = jwt.sign(tokenData, JWT.SIGNATURE, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    try {
        let entidades = await Usuario.findOne({
            attributes: [
                "usuarioid",
                "usuario",
                "descripcion",
                "correo",
                "proveedorid",
                "tipousuarioid",
                "rolid",
                "estado",
                "bloqueado",
                "motivobloqueoid",
                "telefono",
                "ingresos",
                "creado",
                "actualizado",
            ],
            include: [
                {
                    attributes: [
                        "proveedorid",
                        "ruc",
                        "nombre",
                        "razonsocial",
                        "direccion",
                        "telefono",
                        "fax",
                        "correo",
                        "estadoid",
                    ],
                    model: VProveedor,
                    as: "vproveedor",
                    required: true,
                },
                {
                    attributes: ["tipousuarioid", "nombre"],
                    model: Tipousuario,
                    as: "tipousuario",
                    required: true,
                },
                {
                    attributes: ["rolid", "nombre"],
                    model: Rol,
                    as: "rol_web",
                    required: true,
                },
                {
                    attributes: ["motivobloqueoid", "nombre"],
                    model: Motivobloqueo,
                    as: "motivobloqueo",
                    required: false,
                },
            ],
            where: {
                usuario: usuario,
                password: password,
            },
        });

        if (entidades) {
            idusuario = entidades.usuarioid;
            rolidusuario = entidades.rolid;
            usuariosmenus = await getRolmenus(rolidusuario);

            if (usuariosmenus) {
                var idmenus = [...new Set(usuariosmenus.map((item) => item.menuid))];
                // var idmenus = usuariosmenus.map(function(item) {
                //     return item['menuid'];
                // });
            }
            console.log("idmenus: ", idmenus);
            let usumenu = JSON.parse(JSON.stringify(usuariosmenus));
            console.log("usumenu cont: ", Object.keys(usumenu).length);
            urlavatarstring = urlavatarstring.replace(
                "usuarioid",
                entidades.usuarioid
            );
            //console.log("urlavatarstring: ", urlavatarstring)
            menus = await getMenus();
            if (menus) {
                menus.forEach(async (menus) => {
                    let contador = JSON.stringify(menus);
                    let estainsertado = 0;
                    let objecto = JSON.parse(contador);
                    let submenues = objecto.submenu;
                    let cantidadsubmenus = Object.keys(submenues).length;
                    if (cantidadsubmenus > 0) {
                        submenues.forEach((element) => {
                            if (idmenus.indexOf(element.menuid) > -1) {
                                estainsertado = estainsertado + 1;
                            } else {
                                //console.log("no esta");
                            }
                        });
                        //console.log("estainsertado: ", estainsertado);
                        if (estainsertado > 0) {
                            let fnuevomenu = {
                                menuid: objecto.menuid,
                                titulo: objecto.titulo,
                                descripcion: objecto.descripcion,
                                icono: objecto.icono,
                                ruta: objecto.ruta,
                                parentid: objecto.parentid,
                                children: [],
                            };
                            nuevomenu.push(fnuevomenu);
                            submenues.forEach((element) => {
                                if (idmenus.indexOf(element.menuid) > -1) {
                                    let xnuevomenu = {
                                        menuid: element.menuid,
                                        titulo: element.titulo,
                                        descripcion: element.descripcion,
                                        icono: element.icono,
                                        ruta: element.ruta,
                                        parentid: element.parentid,
                                    };
                                    //console.log("xnuevomenu: ", xnuevomenu);
                                    fnuevomenu.children.push(xnuevomenu);
                                } else {
                                    //console.log("no esta");
                                }
                            });
                        } else {
                        }
                    } else {
                    }
                });
            }
            let bloqueado = entidades.bloqueado;
            let ingresos = entidades.ingresos;
            if (bloqueado == 0) {
                entidades.token = token;
                let newingresos = entidades.ingresos + 1;
                let newsesion = await InsertToSession(entidades.usuarioid);
                let toUpdate = {
                    usuarioid: entidades.usuarioid,
                    ingresos: newingresos,
                };
                let upUsuario = await UpdateIngreso(toUpdate);
                entidades.idsesion = newsesion.sesionid;
                entidades.ingresos = newingresos;
                entidades.menu = nuevomenu;
                entidades.avatarurl = String.raw`${urlavatarstring}`;
                return res.status(200).json({
                    data: entidades,
                    // submenus: nuevomenu
                });
            } else {
                res
                    .status(200)
                    .json("Usuario bloqueado, motivo: " + entidades.motivobloqueo.nombre);
            }
        } else {
            res.status(200).json("Usuario o contrase�a incorrectos");
        }
    } catch (e) {
        console.log("error: " + e.message);
        return res.status(500).json({
            message: "Algo salio mal",
            data: {},
        });
    }
}
async function InsertToSession(valuesToInsert, res) {
    const usuarioid = valuesToInsert;
    //console.log(usuarioid);
    try {
        let newsesion = await Sesion.create({
            usuarioid: usuarioid,
            inicio: sequelize.literal("CURRENT_TIMESTAMP"),
            fin: sequelize.literal("CURRENT_TIMESTAMP"),
        });
        if (newsesion) {
            return newsesion;
        }
    } catch (e) {
        console.log("insert: " + e.message);
        return "";
    }
}

async function UpdateIngreso(valuesToInsert, res) {
    const usuarioid = valuesToInsert.usuarioid;
    const ingresos = valuesToInsert.ingresos;
    //console.log(usuarioid);
    try {
        const ingresosapp = await Usuario.findAll({
            attributes: ["usuarioid", "ingresos"],
            where: {
                usuarioid: usuarioid,
            },
        });
        //console.log('ingresosapp.lenght : ' + ingresosapp);
        ingresosapp.forEach(async (ingresosapp) => {
            await Usuario.update(
                {
                    ingresos: ingresos,
                },
                {
                    where: {
                        usuarioid: usuarioid,
                    },
                }
            );
        });
        return 1;
    } catch (e) {
        console.log("update: " + e.message);
        return 0;
    }
}

export async function createUsuario(req, res) {
    const {
        usuario,
        descripcion,
        correo,
        proveedorid,
        tipousuarioid,
        rolid,
        telefono,
        lineasid
    } = req.body;
    console.log("lineasid: ", lineasid);
    let spassword = randomString(8);
    var password = encryptData(spassword);
    console.log("encrypted: ", password);


    // const salt = bcrypt.genSaltSync(saltRounds);
    // const password = bcrypt.hashSync(spassword, salt);

    // console.log("hash: ", password);
    let existeemail = await checkEmail2(correo);
    if (existeemail == '1') {
        return res.status(200).json({
            message: 'El correo electronico ya existe',
            data: {}
        });
    }

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
            let valuesToInsert = {
                usuario: usuario,
                correo: correo,
                password: spassword,
                passwordencrip: password
            };
            var correoenviado = await updateClaveEmailCreate(valuesToInsert);
            if (lineasid != '') {
                try {
                    lineasid.forEach(async element => {
                        let nuevalinea = element;
                        console.log("nuevalinea: ", nuevalinea);
                        let req = {
                            usuarioid: newentidad.usuarioid,
                            lineaid: nuevalinea
                        };
                        var xinsert = await insertLineaUsuarioM(req)
                    });
                } catch (error) {

                }
            }
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
}

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
        estado,
        lineasid
    } = req.body;
    console.log(usuarioid);
    console.log("lineasid: ", lineasid)
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
        var eliminalineas = await deleteLineaUsuarioFk(usuarioid);
        if (lineasid != '') {
            console.log("dentro");
            try {
                lineasid.forEach(async element => {
                    let nuevalinea = element;
                    console.log("nuevalinea: ", nuevalinea);
                    let req = {
                        usuarioid: usuarioid,
                        lineaid: nuevalinea
                    };
                    var xinsert = await insertLineaUsuarioM(req)
                });
            } catch (error) {

            }
        }
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
}

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
                attributes: ['proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: VProveedor,
                as: 'vproveedor',
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
                as: 'rol_web',
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
        console.log(e.message);
        return res.status(500).json({
            message: "Algo salio mal",
            data: {},
        });
    }
}

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
                attributes: ['proveedorid', 'ruc', 'nombre', 'razonsocial', 'direccion', 'telefono', 'fax', 'correo', 'estadoid'],
                model: VProveedor,
                as: 'vproveedor',
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
                as: 'rol_web',
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
}

export async function logoutUsuario(req, res) {
    const { sesionid } = req.body;
    //console.log(usuarioid);
    try {
        const found = await Sesion.findAll({
            attributes: ["sesionid"],
            where: {
                sesionid: sesionid,
            },
        });
        console.log("found.lenght : " + found);
        found.forEach(async (found) => {
            await Sesion.update(
                {
                    fin: sequelize.literal("CURRENT_TIMESTAMP"),
                },
                {
                    where: {
                        sesionid: sesionid,
                    },
                }
            );
        });
        return res.status(200).json("Cierre de sesion correcto");
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Algo salio mal",
            data: {},
        });
    }
}

export async function blockUsuario(req, res) {
    const {
        correo,
        bloqueado,
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
                bloqueado: bloqueado,
                motivobloqueoid: motivobloqueoid
            }, {
                where: {
                    usuarioid: found.usuarioid
                }
            });
        });
        return res.status(200).json('Bloqueo modificado');
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
        return res.status(200).json('Contrasena actualizada');
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
            from: 'contactadimexa@dimexa.com.pe',
            to: correo,
            subject: 'Servicio de recuperacion de contraseña',
            html: `Bienvenido a la Extranet de Dimexa! Tus credenciales son : usuario: <b>${correo}</b> contraseña: <b>${password}</b>`
            // html: 'La contrasena para el usuario con correo: <b>' + correo + '</b> ha sido modificada por <b>' + password + '</b>'
        };
        mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json('Contrase�a actualizada');
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
            attributes: ['lineaid', 'proveedorid', 'nombre'],
            include: [{
                attributes: [],
                where: {
                    usuarioid: usuarioid
                },
                model: Usuariolinea.scope(null),
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
export async function getLineasusuarioSelect(req, res) {
    const {
        usuarioid
    } = req.body;
    try {
        let entidades = await Linea.findAll({
            attributes: [
                ['lineaid', 'id'],
                ['nombre', 'descripcion']
            ],
            include: [{
                attributes: [],
                where: {
                    usuarioid: usuarioid
                },
                model: Usuariolinea.scope(null),
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
export async function insertLineaUsuario(req, res) {
    const {
        usuarioid,
        lineaid
    } = req.body;
    try {
        let newentidad = await Usuariolinea.create({
            usuarioid: usuarioid,
            lineaid: lineaid
        });
        if (newentidad) {
            return res.status(200).json({
                data: newentidad,
            });
        } else {
            return res.status(200).json({
                message: 'No se pudo insertar',
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
export async function deleteLineaUsuario(req, res) {
    const {
        id
    } = req.body;
    try {
        let newentidad = await Usuariolinea.findOne({
            attributes: ['id', 'usuarioid', 'lineaid'],
            where: {
                id: id
            }
        });
        if (newentidad) {
            let deleted = await Usuariolinea.destroy({
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
        return "";
    }
}

function randomString(len) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "");
}

async function insertLineaUsuarioM(req) {
    const usuarioid = req.usuarioid;
    const lineaid = req.lineaid;
    try {
        let newentidad = await Usuariolinea.create({
            usuarioid: usuarioid,
            lineaid: lineaid,
        });
        if (newentidad) {
            return "1";
        } else {
            return "0";
        }
    } catch (e) {
        console.log("insert: " + e.message);
        return "0";
    }
}

async function deleteLineaUsuarioFk(req) {
    const id = req;
    //console.log('destroy id: ' + id)
    try {
        let newentidad = await Usuariolinea.findOne({
            attributes: ["id", "usuarioid", "lineaid"],
            where: {
                usuarioid: id,
            },
        });
        if (newentidad) {
            let deleted = await Usuariolinea.destroy({
                where: {
                    usuarioid: id,
                },
            });
            if (deleted === 1) {
                return "1";
            } else {
                return "0";
            }
        } else {
            return "0";
        }
    } catch (e) {
        console.log("destroy all: " + e.message);
        return "0";
    }
}

export async function testSendEmail(req, res) {
    const { correo } = req.body;
    console.log('correo:', correo)
    try {
        var image = "data:image/jpeg;base64,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";
        var mailOptions = {
            from: 'contactadimexa@dimexa.com.pe',
            to: correo,
            subject: 'Extranet Dimexa - Servicio de creacion de contraseña',
            html: `
            <table style="background-position: center;border: 2px solid #5484b5;border-radius: 15px;width: 600px;">
                <tr>
                    <td>
                        <table style="width:500px;border-radius: 20px;background-color: #FFFFFF;margin: auto;">
                            <tr>
                                <td style="font-size: 30px;color: #8aaf4e; text-align: center;">
                                    Bienvenido a la:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 30px;color: #5484b5; font-weight: bold; text-align: center;">
                                    EXTRANET DIMEXA
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style="height: 2px;width: 500px;background: #5484b5; border: 0;" />
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;height: 110px;">
                                    Gracias por ser parte de nuestra plataforma. Cuando inicies sesión recuerda que éstas son tus
                                    credenciales para poder ingresar, si tienes alguna duda por favor comunícate con nosotros
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="font-size: 20px;font-weight: bold;color: #8cad51;">USUARIO:</td>
                                            <td style="font-size: 18px;font-weight: bold;text-align: center;">
                                                xxx</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 20px;font-weight: bold;color: #8cad51;">CONTRASEÑA:</td>
                                            <td style="font-size: 18px;font-weight: bold;text-align: center;">
                                                xxxx</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="height: 80px;text-align: center;">
                                                <a style="text-decoration: none;background-color: #5484b5;color: #FFFFFF;padding: 15px 30px;border-radius: 15px;font-weight: bold;"
                                                    href='http://190.116.51.178/autenticacion/login' target="_blank">Ingresa a tu
                                                    plataforma</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
        };
        await mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Algo salio mal',
                    data: error
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    message: 'Mensaje Enviado',
                    data: ''
                });
            }
        });


    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}


async function updateClaveEmailCreate(valuesToInsert) {

    const correo = valuesToInsert.correo;
    const passwordencrip = valuesToInsert.passwordencrip;
    const password = valuesToInsert.password;
    const usuario = valuesToInsert.usuario;
    console.log('correo: ', correo);
    console.log('passwordencrip: ', passwordencrip);
    console.log('password: ', password);
    console.log('usuario: ', usuario);
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
            from: 'contactadimexa@dimexa.com.pe',
            to: correo,
            subject: 'Servicio de creacion de contraseña',
            html: `
        <table style="background-position: center;border: 2px solid #5484b5;border-radius: 15px;width: 600px;">
                <tr>
                    <td>
                        <table style="width:500px;border-radius: 20px;background-color: #FFFFFF;margin: auto;">
                            <tr>
                                <td style="font-size: 30px;color: #8aaf4e; text-align: center;">
                                    Bienvenido a la:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 30px;color: #5484b5; font-weight: bold; text-align: center;">
                                    EXTRANET DIMEXA
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style="height: 2px;width: 500px;background: #5484b5; border: 0;" />
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;height: 110px;">
                                    Gracias por ser parte de nuestra plataforma. Cuando inicies sesión recuerda que éstas son tus
                                    credenciales para poder ingresar, si tienes alguna duda por favor comunícate con nosotros
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="font-size: 20px;font-weight: bold;color: #8cad51;">USUARIO:</td>
                                            <td style="font-size: 18px;font-weight: bold;text-align: center;">
                                            :usuario</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 20px;font-weight: bold;color: #8cad51;">CONTRASEÑA:</td>
                                            <td style="font-size: 18px;font-weight: bold;text-align: center;">
                                            :password</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="height: 80px;text-align: center;">
                                                <a style="text-decoration: none;background-color: #5484b5;color: #FFFFFF;padding: 15px 30px;border-radius: 15px;font-weight: bold;"
                                                    href=':url' target="_blank">Ingresa a tu
                                                    plataforma</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
                .replaceAll(':usuario', usuario)
                .replaceAll(':password', password)
                .replaceAll(':url', `http://${process.env.DB_HOST_FRONT}/autenticacion/login`),
        };
        mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return '1';
    } catch (e) {
        console.log(e.message)
        return '';
    }
};
async function checkEmail2(correox) {
    const correo = correox;
    try {
        let entidades = await Usuario.findOne({
            attributes: ['usuarioid', 'usuario', 'descripcion', 'correo', 'proveedorid', 'tipousuarioid', 'rolid', 'estado', 'bloqueado', 'motivobloqueoid',
                'telefono', 'ingresos', 'creado', 'actualizado'
            ],
            where: {
                correo: correo
            }
        });
        if (entidades) {
            return '1';
        } else {
            return '0';
        }
    } catch (e) {
        console.log(e.message)
        return '0';
    }
};

async function getLineasUsuarioSelect(req) {
    const usuarioid = req;
    try {
        let lineas = await Linea.findAll({
            attributes: [
                ['lineaid', 'id'],
                ['nombre', 'descripcion']
            ],
            include: [{
                attributes: [],
                model: Usuariolinea.scope(null),
                as: 'usuariolinea',
                required: true,
                where: {
                    usuarioid: usuarioid
                }
            }],
        });

        if (lineas) {
            return lineas;
        } else {
            return {};
        }
    } catch (e) {
        return {};
    }
};

export async function updateUsuarioId(req, res) {
    try {
        let updateUserId = await Usuario.sequelize.query(
            "SELECT setval('axeso.usuario_web_seq', (SELECT MAX(usuarioid) FROM axeso.usuario_web))", {
            type: Usuario.sequelize.QueryTypes.SELECT,
        });
        console.log('updateUserId', updateUserId)
        if (updateUserId) {
            return res.status(200).json({
                data: 'Se actualzo usuario_web_seq al ultimo userId'
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

