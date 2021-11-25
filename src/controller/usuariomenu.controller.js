import { json, where } from 'sequelize';
import sequelize from 'sequelize';
import Usuariomenu from '../models/usuariomenu.model';

export async function getUsuariomenu(req, res) {
    const { id } = req.query;
    try {
        let entidades = await Usuariomenu.findAll({
            attributes: ['id', 'usuarioid', 'menuid'],
            where: {
                usuarioid: id
            }
        });
        //console.log(entidades[0].usuarioid);
        // entidades.forEach(usuarmenu => {
        //     console.log(usuarmenu.usuarioid);
        // });
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