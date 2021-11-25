const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/usuarios', db.getUsuarios)
app.post('/loginusuario', db.loginUsuario)
app.post('/insertusuario', db.insertUsuario)
app.post('/selectusuario', db.selectUsuario)
app.post('/blockusuario', db.blockUsuario)
app.post('/checkusuario', db.checkUsuario)
app.post('/checkemail', db.checkEmail)

app.put('/updateusuario', db.updateUsuario)
app.put('/updateclaveusuario', db.updateClaveUsuario)
app.put('/updateclaveemail', db.updateClaveEmail)
app.put('/updateingresousuario', db.updateIngresoUsuario)

app.get('/getproveedores', db.getProveedores)
app.get('/getroles', db.getRoles)
app.get('/gettipousuarios', db.getTipoUsuarios)
app.get('/getmotivobloqueos', db.getMotivoBloqueos)
app.get('/getmenus', db.getMenus)
app.get('/getproveedoresselect', db.getProveedoresSelect)
app.put('/logoutusuario', db.logoutUsuario)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})