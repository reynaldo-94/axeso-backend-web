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
//const CryptoJS = require("../utils/aes");
var CryptoJS = require("crypto-js");
//declare var CryptoJS: any;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soporte.dimexa@gmail.com',
        pass: 'S0p0rt3D1m3xa'
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
            res.status(200).json('Usuario o contrase�a incorrectos');
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
            attributes: ['id', 'lineaid', 'proveedorid', 'nombre'],
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
        return '';
    }
};
async function updateClaveEmailCreate(valuesToInsert) {

    const correo = valuesToInsert.correo;
    const passwordencrip = valuesToInsert.passwordencrip;
    const password = valuesToInsert.password;
    const usuario = valuesToInsert.usuario;
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
            subject: 'Servicio de creacion de contrase�a',
            html: 'La contrase�a para el usuario con usuario: <b>' + usuario + '</b> ha sido creada por <b>' + password + '</b>'
        };
        mail.sendMail(mailOptions, function(error, info) {
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

function randomString(len) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '');
}

async function insertLineaUsuarioM(req) {
    const usuarioid = req.usuarioid;
    const lineaid = req.lineaid;
    try {
        let newentidad = await Usuariolinea.create({
            usuarioid: usuarioid,
            lineaid: lineaid
        });
        if (newentidad) {
            return '1';
        } else {
            return '0';
        }
    } catch (e) {
        console.log('insert: ' + e.message)
        return '0';
    }
};

async function deleteLineaUsuarioFk(req) {
    const id = req;
    //console.log('destroy id: ' + id)
    try {
        let newentidad = await Usuariolinea.findOne({
            attributes: ['id', 'usuarioid', 'lineaid'],
            where: {
                usuarioid: id
            }
        });
        if (newentidad) {
            let deleted = await Usuariolinea.destroy({
                where: {
                    usuarioid: id
                }
            });
            if (deleted === 1) {
                return '1';
            } else {
                return '0';
            }
        } else {
            return '0';
        }
    } catch (e) {
        console.log('destroy all: ' + e.message)
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