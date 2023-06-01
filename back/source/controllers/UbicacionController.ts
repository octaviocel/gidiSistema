import { Ubicacion } from './../entity/Ubicacion';
import { AppDataSource } from './../data-source';
import { Request, Response } from 'express';


const repo = AppDataSource.getRepository(Ubicacion);

export const createUbacion = async (req: Request, res: Response) => {

    try {
        const {
            name
        } = req.body;

        const insert = await Ubicacion.save({
            name: name,
        })

        return res.status(200).json({ insert });

    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ error: "There was an error" });
    }
}

export const getUbicacionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userFound = await Ubicacion.findOneBy({ id: Number(id) });

    if (userFound) return res.status(200).json(userFound);

    return res.status(400).json({ error: "No location." });
}

export const getAllUbicaciones = async (req: Request, res: Response) => {
    const residuos = await repo
        .createQueryBuilder('ubicacion')
        .orderBy('ubicacion.id', 'ASC')
        .getMany();
    //console.log(ubicaciones)
    if (residuos) {
        return res.status(200).json(residuos)
    }
    else {
        return res.status(400).json({ error: "No locations." });

    }
}

export const updateUbicacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const ubi = await Ubicacion.findOneBy({
        id: Number(id),
    });

    if (!ubi) {
        return res.status(400).json({
            error: "No location"
        })
    }

    const ubiUpdated = await repo
        .createQueryBuilder()
        .update({
            name
        })
        .where({
            id: ubi.id
        })
        .returning("*")
        .execute()

    if (ubiUpdated.affected === 0) {
        return res.status(400).json({ error: "There was an error updating." });
    }

    return res.status(201).json({ ubicacion: ubiUpdated.raw[0] })
}

export const deleteUbicacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ubiDeleted = await Ubicacion.delete({
            id: Number(id),
        });

        if (ubiDeleted) {
            if (ubiDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No location." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
}