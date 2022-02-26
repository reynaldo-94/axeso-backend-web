const config = require('dotenv')
var nodemailer = require('nodemailer');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'axeso',
    host: '190.116.51.182',
    database: 'dmx_prov',
    password: 'axeso@D593*',
    port: 5432,
})
let actualusuario;
let newusuario;
let xsessionid;
var jwt = require('jsonwebtoken');
var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soporte.dimexa@gmail.com',
        pass: 'S0p0rt3D1m3xa'
    }
});
const getProveedores = (request, response) => {
    pool.query("SELECT proveedorid as id, nombre as texto, ruc as descripcion FROM public.proveedor ORDER BY proveedorid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getProveedoresSelect = (request, response) => {
    pool.query("SELECT proveedorid as id, nombre as descripcion FROM public.proveedor ORDER BY proveedorid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getRoles = (request, response) => {
    pool.query("SELECT * FROM public.rol ORDER BY rolid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getTipoUsuarios = (request, response) => {
    pool.query("SELECT * FROM public.tipousuario ORDER BY tipousuarioid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getMotivoBloqueos = (request, response) => {
    pool.query("SELECT * FROM public.motivobloqueo ORDER BY motivobloqueoid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getUsuarios = (request, response) => {
    pool.query("SELECT public.usuario.usuarioid, public.usuario.usuario, public.usuario.descripcion, public.usuario.telefono, public.usuario.correo, public.usuario.proveedorid, public.usuario.tipousuarioid, public.usuario.rolid, public.usuario.estado, public.usuario.bloqueado, public.usuario.motivobloqueoid, public.usuario.ingresos, public.usuario.creado, public.usuario.actualizado, public.proveedor.ruc, public.proveedor.razonsocial, public.proveedor.nombre, public.tipousuario.nombre as tipousuario, public.rol.nombre as rol, public.motivobloqueo.nombre as motivobloqueo FROM public.usuario LEFT JOIN public.proveedor ON public.usuario.proveedorid = public.proveedor.proveedorid INNER JOIN public.tipousuario ON public.usuario.tipousuarioid = public.tipousuario.tipousuarioid INNER JOIN public.rol ON public.usuario.rolid = public.rol.rolid LEFT JOIN public.motivobloqueo ON public.usuario.motivobloqueoid = public.motivobloqueo.motivobloqueoid ORDER BY usuarioid ASC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getMenus = (request, response) => {
    pool.query("SELECT * FROM public.menu ORDER BY menuid ASC ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const loginUsuario = async(request, response) => {
    const { correo, password } = request.query
    const logueo = await LoginUser(request.query).then((usuario) => {
        try {
            let resultado = usuario;
            if (resultado == '') {
                response.status(200).json('Usuario o contrasena incorrectos')
            }
        } catch (e) {

        }
        var tokenData = {
            username: correo
        }
        var token = jwt.sign(tokenData, "l7ltkfxrUber40KY1oxwHzE6", {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
        if (usuario.bloqueado == '0') {
            let newingresos = usuario.ingresos + 1;
            let newid = 0;
            InsertToSession(usuario.usuarioid).then((sesionID) => {
                newid = sesionID
                    //console.log("InsertToSession: " + newid)
                newusuario = {
                    "usuarioid": usuario.usuarioid,
                    "usuario": usuario.usuario,
                    "descripcion": usuario.descripcion,
                    "correo": usuario.correo,
                    "proveedorid": usuario.proveedorid,
                    "tipousuarioid": usuario.tipousuarioid,
                    "rolid": usuario.rolid,
                    "estado": usuario.estado,
                    "bloqueado": usuario.bloqueado,
                    "motivobloqueoid": usuario.motivobloqueoid,
                    "ingresos": newingresos,
                    "creado": usuario.creado,
                    "actualizado": usuario.actualizado,
                    "password": usuario.password,
                    "telefono": usuario.telefono,
                    "ruc": usuario.ruc,
                    "razonsocial": usuario.razonsocial,
                    "nombre": usuario.nombre,
                    "tipousuario": usuario.tipousuario,
                    "rol": usuario.rol,
                    "token": token,
                    "motivobloqueo": usuario.motivobloqueo,
                    "sesionid": newid
                }
                let valuesto = {
                    "ingresos": newingresos,
                    "usuarioid": usuario.usuarioid
                }
                UpdateIngreso(valuesto).then((userid) => {
                    console.log("userid: " + userid)
                });
                response.status(200).json(newusuario)
            });


        } else {
            response.status(200).json('Usuario bloqueado, motivo: ' + results.rows[0].motivobloqueo)
        }
    })
    console.log('logueo ' + logueo)
    console.log('vacios')
}

function InsertToSession(valuesToInsert) {
    const text = "INSERT INTO public.sesion(usuarioid, inicio, fin) VALUES ($1, NOW() + interval '24h', NOW() + interval '24h') RETURNING sesionid"
    const values = [valuesToInsert]
    return new Promise(function(resolve, reject) {
        pool.query(text, values, (err, res) => {
            if (err) {
                logger.error('Error saving to db: ' + err);
                console.log('Error saving to db: ' + err);
                reject(0)
            } else {
                //console.log('id: ' + res.rows[0].sesionid) //This gives me the value to console.
                //xsessionid = res.rows[0].sesionid
                resolve(res.rows[0].sesionid)
            }
        })
    })
}

function UpdateIngreso(valuesToInsert) {
    const text = "UPDATE public.usuario SET ingresos = $1 WHERE usuarioid = $2 "
    console.log("ingresos: " + valuesToInsert.ingresos)
    const values = [valuesToInsert.ingresos, valuesToInsert.usuarioid]
    return new Promise(function(resolve, reject) {
        pool.query(text, values, (err, res) => {
            if (err) {
                logger.error('Error saving to db: ' + err);
                console.log('Error saving to db: ' + err);
                resolve(0)
            } else {
                console.log('usuarioid: ' + valuesToInsert.usuarioid) //This gives me the value to console.
                resolve(valuesToInsert.usuarioid)
            }
        })
    })
}

async function LoginUser(valuesToInsert) {
    const text = "SELECT public.usuario.usuarioid, public.usuario.usuario, public.usuario.descripcion, public.usuario.telefono, public.usuario.correo, public.usuario.proveedorid, public.usuario.tipousuarioid, public.usuario.rolid, public.usuario.estado, public.usuario.bloqueado, public.usuario.motivobloqueoid, public.usuario.ingresos, public.usuario.creado, public.usuario.actualizado, public.proveedor.ruc, public.proveedor.razonsocial, public.proveedor.nombre, public.tipousuario.nombre as tipousuario, public.rol.nombre as rol, public.motivobloqueo.nombre as motivobloqueo FROM public.usuario LEFT JOIN public.proveedor ON public.usuario.proveedorid = public.proveedor.proveedorid INNER JOIN public.tipousuario ON public.usuario.tipousuarioid = public.tipousuario.tipousuarioid INNER JOIN public.rol ON public.usuario.rolid = public.rol.rolid LEFT JOIN public.motivobloqueo ON public.usuario.motivobloqueoid = public.motivobloqueo.motivobloqueoid where public.usuario.correo = $1 and public.usuario.password = $2"
    const values = [valuesToInsert.correo, valuesToInsert.password]
    console.log('values: ' + values);
    return new Promise(function(resolve, reject) {
        pool.query(text, values, (err, res) => {
            if (err) {
                logger.error('Error saving to db: ' + err);
                console.log('Error saving to db: ' + err);
                reject('')
            } else {
                if (res.rowCount > 0) {
                    console.log('userid: ' + res.rows[0].usuarioid)
                    resolve(res.rows[0])
                } else {
                    //reject('')
                    resolve('')
                }
            }
        })
    })
}

const insertUsuario = (request, response) => {
    const { usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, estado, bloqueado, motivobloqueoid, ingresos, password, telefono } = request.query
        // let buff = new Buffer(password);
        // let base64data = buff.toString('base64');
        //console.log(base64data);
    pool.query("INSERT INTO public.usuario(usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, estado, bloqueado, motivobloqueoid, ingresos, creado, actualizado, password, telefono ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW()  + interval '24h',NOW()  + interval '24h',$11,$12)", [usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, estado, bloqueado, motivobloqueoid, ingresos, password, telefono], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json('User added')
    })
}

const selectUsuario = (request, response) => {
    const { usuarioid } = request.query;
    pool.query("SELECT public.usuario.usuarioid, public.usuario.usuario, public.usuario.descripcion, public.usuario.telefono, public.usuario.correo, public.usuario.proveedorid, public.usuario.tipousuarioid, public.usuario.rolid, public.usuario.estado, public.usuario.bloqueado, public.usuario.motivobloqueoid, public.usuario.ingresos, public.usuario.creado, public.usuario.actualizado, public.proveedor.ruc, public.proveedor.razonsocial, public.proveedor.nombre, public.tipousuario.nombre as tipousuario, public.rol.nombre as rol, public.motivobloqueo.nombre as motivobloqueo FROM public.usuario LEFT JOIN public.proveedor ON public.usuario.proveedorid = public.proveedor.proveedorid INNER JOIN public.tipousuario ON public.usuario.tipousuarioid = public.tipousuario.tipousuarioid INNER JOIN public.rol ON public.usuario.rolid = public.rol.rolid LEFT JOIN public.motivobloqueo ON public.usuario.motivobloqueoid = public.motivobloqueo.motivobloqueoid  where public.usuario.usuarioid = $1", [usuarioid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const blockUsuario = (request, response) => {
    const { correo, motivobloqueoid } = request.query;
    pool.query("UPDATE public.usuario SET bloqueado = '1', motivobloqueoid = $2 WHERE correo =$1", [correo, motivobloqueoid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json('User blocked')
    })
}
const checkUsuario = (request, response) => {
    const { usuario } = request.query;
    pool.query("select public.usuario.usuarioid, public.usuario.usuario, public.usuario.descripcion, public.usuario.telefono, public.usuario.correo, public.usuario.proveedorid, public.usuario.tipousuarioid, public.usuario.rolid, public.usuario.estado, public.usuario.bloqueado, public.usuario.motivobloqueoid, public.usuario.ingresos, public.usuario.creado, public.usuario.actualizado, public.proveedor.ruc, public.proveedor.razonsocial, public.proveedor.nombre, public.tipousuario.nombre as tipousuario, public.rol.nombre as rol, public.motivobloqueo.nombre as motivobloqueo FROM public.usuario LEFT JOIN public.proveedor ON public.usuario.proveedorid = public.proveedor.proveedorid INNER JOIN public.tipousuario ON public.usuario.tipousuarioid = public.tipousuario.tipousuarioid INNER JOIN public.rol ON public.usuario.rolid = public.rol.rolid LEFT JOIN public.motivobloqueo ON public.usuario.motivobloqueoid = public.motivobloqueo.motivobloqueoid where public.usuario.usuario = $1", [usuario], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const checkEmail = (request, response) => {
    const { correo } = request.query;
    pool.query("select public.usuario.usuarioid, public.usuario.usuario, public.usuario.descripcion, public.usuario.telefono, public.usuario.correo, public.usuario.proveedorid, public.usuario.tipousuarioid, public.usuario.rolid, public.usuario.estado, public.usuario.bloqueado, public.usuario.motivobloqueoid, public.usuario.ingresos, public.usuario.creado, public.usuario.actualizado, public.proveedor.ruc, public.proveedor.razonsocial, public.proveedor.nombre, public.tipousuario.nombre as tipousuario, public.rol.nombre as rol, public.motivobloqueo.nombre as motivobloqueo FROM public.usuario LEFT JOIN public.proveedor ON public.usuario.proveedorid = public.proveedor.proveedorid INNER JOIN public.tipousuario ON public.usuario.tipousuarioid = public.tipousuario.tipousuarioid INNER JOIN public.rol ON public.usuario.rolid = public.rol.rolid LEFT JOIN public.motivobloqueo ON public.usuario.motivobloqueoid = public.motivobloqueo.motivobloqueoid where public.usuario.correo = $1", [correo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const updateUsuario = (request, response) => {
    const { usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, estado, bloqueado, motivobloqueoid, telefono, usuarioid } = request.query
    console.log("values: " + usuario + ", " + descripcion + ", " + correo + ", " + proveedorid + ", " + tipousuarioid + ", " + rolid + ", " + estado + ", " + bloqueado + ", " + motivobloqueoid + ", " + telefono + ", " + usuarioid)
    pool.query(
        "UPDATE public.usuario SET usuario = $1, descripcion = $2 , correo = $3 , proveedorid = $4 , tipousuarioid = $5, rolid = $6, estado = $7, bloqueado = $8, motivobloqueoid = $9, actualizado = NOW() + interval '24h', telefono = $10   WHERE usuarioid = $11", [usuario, descripcion, correo, proveedorid, tipousuarioid, rolid, estado, bloqueado, motivobloqueoid, telefono, usuarioid],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json('Usuario actualizado')
        }
    )
}

const updateIngresoUsuario = (request, response) => {
    const { ingresos, usuarioid } = request.query

    pool.query(
        "UPDATE public.usuario SET ingresos = $1, actualizado = NOW() + interval '24h' WHERE usuarioid = $2", [ingresos, usuarioid],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(`User modified with ID: ${usuarioid}`)
        }
    )
}

function randomString(len) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '');
}

const updateClaveUsuario = (request, response) => {
    const { usuario, password } = request.query
    pool.query(
        'UPDATE public.usuario SET password = $1 WHERE usuario = $2', [password, usuario],
        (error, results) => {
            if (error) {
                throw error
            }
            newusuario = {
                "usuario": usuario
            }
            response.status(200).json(newusuario)
        }
    )
}
const updateClaveEmail = (request, response) => {
    const { correo, passwordencrip, password } = request.query
    pool.query(
        'UPDATE public.usuario SET password = $1 WHERE correo = $2', [passwordencrip, correo],
        (error, results) => {
            if (error) {
                throw error
            }
            newusuario = {
                "correo": correo
            }

            var mailOptions = {
                from: 'soporte.dimexa@gmail.com',
                to: correo,
                subject: 'Servicio de recuperacion de contrasena',
                html: 'La contrasena para el usuario con correo: <b>' + correo + '</b> ha sido modificada por <b>' + password + '</b>'
            };
            mail.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            response.status(200).json(newusuario)
        }
    )
}
const logoutUsuario = (request, response) => {
    const { sesionid } = request.query

    pool.query(
        "UPDATE public.sesion SET fin=NOW() + interval '24h' WHERE sesionid = $1", [sesionid],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json('Cierre de sesion correcto')
        }
    )
}
module.exports = {
    getUsuarios,
    loginUsuario,
    insertUsuario,
    selectUsuario,
    blockUsuario,
    checkUsuario,
    updateUsuario,
    updateClaveUsuario,
    updateClaveEmail,
    getProveedores,
    checkEmail,
    getRoles,
    getTipoUsuarios,
    getMotivoBloqueos,
    getMenus,
    updateIngresoUsuario,
    getProveedoresSelect,
    logoutUsuario
}