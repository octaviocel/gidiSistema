import { Recoleccion } from './../entity/Recoleccion';
import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';
import { Ubicacion } from '../entity/Ubicacion';
import { In } from 'typeorm';
import { Residuo } from '../entity/Residuo';

const repo = AppDataSource.getRepository(Recoleccion);

export const createRecoleccion = async (req: Request, res: Response) => {
    const { dias, residuos, ubicaciones } = req.body;

    const ubications = await Ubicacion.findBy({ id: In(ubicaciones) });

    const residu = await Residuo.findBy({ id: In(residuos) });

    const insert = await Recoleccion.save({
        dias: dias,
        estatus: false,
        ubication: ubications,
        residuos: residu,
    })

    if (insert) return res.status(201).json({ recoleccion: insert });
    return res.status(400).json({ error: "There was an error" })
}

export const getRecoleccionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const residuo = await Recoleccion.findOneBy({ id: Number(id) });

    if (residuo) return res.status(200).json(residuo);

    return res.status(400).json({ error: "No recoleccion." });
};

export const getAllRecolecciones = async (req: Request, res: Response) => {
    const rolesFound = await repo
        .createQueryBuilder('recoleccion')
        .innerJoin('recoleccion.ubication', 'ubicacion')
        .innerJoin('recoleccion.residuos', 'residuo')
        .select(['recoleccion.*', `JSON_OBJECT_AGG(ubicacion.id, ubicacion.name) AS ubicaciones`, `JSON_OBJECT_AGG(residuo.id, residuo.name) AS residuos`])
        //.select(['*'])
        .addSelect(`(SELECT SUM(peso_total) FROM recoleccioncabecera r WHERE r.recoleccion_id = recoleccion.id)`, 'total')
        .groupBy('recoleccion.id')
        .getRawMany();

    //console.log(rolesFound)

    return res.status(200).json(rolesFound);
};



export const updateRecollecion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dias, estatus } = req.body;

    const rolFound = await Recoleccion.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "No Recoleccion.",
        });

    const rolUpdated = await repo
        .createQueryBuilder()
        .update({
            dias: dias,
            estatus: estatus
        })
        .where({
            id: rolFound.id,
        })
        .returning("*")
        .execute();

    if (rolUpdated.affected == 0)
        return res.status(400).json({ error: "There was an error updating." });

    return res.status(201).json({ rol: rolUpdated.raw[0] });
};

export const deleteRecollecion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await Recoleccion.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No recoleccion." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
};
