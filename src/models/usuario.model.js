import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Usuariomenu from './usuariomenu.model';

import Sesion from './sesion.model';
import Usoaplicacion from './usoaplicacion.model';
import Menu from './menu.model';

const Usuario = sequelize.define('usuario', {
    usuarioid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    proveedorid: {
        type: Sequelize.STRING,
        foreingKey: true,
        references: {
            model: 'Proveedor',
            key: 'proveedorid'
        }
    },
    tipousuarioid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Tipousuario',
            key: 'tipousuarioid'
        }
    },
    rolid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Rol',
            key: 'rolid'
        }
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    bloqueado: {
        type: Sequelize.BOOLEAN
    },
    motivobloqueoid: {
        type: Sequelize.INTEGER,
        foreingKey: true,
        references: {
            model: 'Motivobloqueo',
            key: 'motivobloqueoid'
        }
    },
    password: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    ingresos: {
        type: Sequelize.INTEGER
    },
    creado: {
        type: Sequelize.TIME
    },
    actualizado: {
        type: Sequelize.TIME
    },
    token: {
        type: Sequelize.STRING
    },
    idsesion: {
        type: Sequelize.INTEGER
    },
    avatarurl: {
        type: Sequelize.STRING
    },
    menu: [

    ]
}, {
    freezeTableName: true,
    timestamps: false
});

// Usuario.belongsToMany(Menu, { through: Usuariomenu })
// Menu.belongsToMany(Usuario, { through: Usuariomenu })

// Usuario.belongsToMany(Usuariomenu, { as: 'usuariomenu', through: 'usuariomenu', foreignKey: 'usuarioid' })
// Usuariomenu.belongsToMany(Usuario, { as: 'usuario', through: 'usuario', foreignKey: 'usuarioid' })

// Usuario.belongsToMany(Usuariomenu, { through: 'Usuariomenu' });

// Usuariomenu.hasMany(Usuario, { foreignKey: 'usuarioid', as: 'usuario' });

Usoaplicacion.hasMany(Usuario, { foreignKey: 'usuarioid' });
Usuario.belongsTo(Usoaplicacion, { foreignKey: 'usuarioid' });

Sesion.belongsTo(Usuario, { foreignKey: 'usuarioid', as: 'usuario' });
Usuario.belongsTo(Sesion, { foreignKey: 'usuarioid', as: 'sesion' });

export default Usuario;