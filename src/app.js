
const dotenv  = require('dotenv');
dotenv.config();

const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
var cors = require('cors')
const cron = require('node-cron');

const sublineaRoutes = require('./routes/sublinea.routes');
const almacenRoutes = require('./routes/almacen.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const lineaRoutes = require('./routes/linea.routes');
const sesionRoutes = require('./routes/sesion.routes');
const ubigeoRoutes = require('./routes/ubigeo.routes');
const usuariomenuRoutes = require('./routes/usuariomenu.routes');
const clienteRoutes = require('./routes/cliente.routes');
const rolRoutes = require('./routes/rol.routes');
const tipousuarioRoutes = require('./routes/tipousuario.routes');
const productoRoutes = require('./routes/producto.routes');
const menuRoutes = require('./routes/menu.routes');
const periodoRoutes = require('./routes/periodo.routes');
const divisionRoutes = require('./routes/division.routes');
const unidadnegocioRoutes = require('./routes/unidadnegocio.routes');
const zonaRoutes = require('./routes/zona.routes');
const contactoproveedorRoutes = require('./routes/contacto_proveedor.routes');
const contactodimexaRoutes = require('./routes/contacto_dimexa.routes');
const estado_cuentaRoutes = require('./routes/estado_cuenta.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const indicadoresservicioRoutes = require('./routes/indicadores_servicio.routes');

// Jobs
const { jobDashboard } = require('./jobs/dashboard.job');
const { jobDetalleVentas } = require('./jobs/detalle_ventas.job');
const { jobAntiguedadInventario } = require('./jobs/antiguedad_inventario.job');

const app = express();
app.use(morgan('dev'));
app.use(json());
app.use(cors())
app.use('/sublineas', sublineaRoutes);
app.use('/almacenes', almacenRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/lineas', lineaRoutes);
app.use('/sesiones', sesionRoutes);
app.use('/ubigeos', ubigeoRoutes);
app.use('/usuariomenus', usuariomenuRoutes);
app.use('/clientes', clienteRoutes);
app.use('/roles', rolRoutes);
app.use('/tipousuarios', tipousuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/menus', menuRoutes);
app.use('/periodos', periodoRoutes);
app.use('/divisiones', divisionRoutes);
app.use('/unidadnegocios', unidadnegocioRoutes);
app.use('/zonas', zonaRoutes);
app.use('/contactoproveedores', contactoproveedorRoutes);
app.use('/contactosdimexa', contactodimexaRoutes);
app.use('/estado_cuenta', estado_cuentaRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/indicadoresservicio', indicadoresservicioRoutes);

let isRunningDH = false
const taskDashboard = cron.schedule(process.env.CRON_TIME, async () => {
  if (!isRunningDH) {
    isRunningDH = true;
    await jobDashboard();
    isRunningDH = false;
  } else console.log('Already running Dashboard - Sellout - ComprasIngresos - DeudaPendiente - Dashboard');
});

let isRunningDV = false
const taskDetalleVentas = cron.schedule(process.env.CRON_TIME, async () => {
    if (!isRunningDV) {
      isRunningDV = true;
      await jobDetalleVentas();
      isRunningDV = false;
    } else console.log('Already running Detalle Ventas');
  });

let isRunningAI = false
const taskAntiguedadInventario = cron.schedule(process.env.CRON_TIME, async () => {
    if (!isRunningAI) {
      isRunningAI = true;
      await jobAntiguedadInventario();
      isRunningAI = false;
    } else console.log('Already running Antiguedad Inventario');
  });

taskDashboard.start();
taskDetalleVentas.start();
taskAntiguedadInventario.start();

module.exports = app;