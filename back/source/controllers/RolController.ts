import { Rol } from './../entity/Rol';

import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';

const repo = AppDataSource.getRepository(Rol);

export const createRol = async (req: Request, res: Response) => {
    const { rolName } = req.body;

    const insert = await Rol.save({
        rolName: rolName
    })

    if (insert) return res.status(201).json({ rol: insert });
    return res.status(100).json({ error: "Hubo un error al crear el rol" })
}

export const getRolById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rolFound = await Rol.findOneBy({ id: Number(id) });

    if (rolFound) return res.status(200).json(rolFound);

    return res.status(400).json({ error: "No existe el rol." });
};

export const getAllRoles = async (req: Request, res: Response) => {
    const rolesFound = await Rol.find();
    return res.status(200).json(rolesFound);
};

export const updateRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rolName } = req.body;

    const rolFound = await Rol.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "Rol no existe.",
        });

    const rolUpdated = await repo
        .createQueryBuilder()
        .update({
            rolName
        })
        .where({
            id: rolFound.id,
        })
        .returning("*")
        .execute();

    if (rolUpdated.affected == 0)
        return res.status(400).json({ error: "Hubo un error al actualizar." });

    return res.status(201).json({ rol: rolUpdated.raw[0] });
};

export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rolFound = await Rol.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "Rol no existe.",
        });

    try {
        const rolDeleted = await Rol.delete({
            id: Number(id),
        });

        if (rolDeleted) {
            if (rolDeleted.affected == 0)
                return res.status(400).json({ error: "Hubo un error al eliminar." });

            return res.status(200).json({ id: id });
        }
        return res.status(400).json({ error: "Rol no existe." });
    } catch (error) {
        return res.status(400).json({ error: "Hubo un error al eliminar." });
    }
};
