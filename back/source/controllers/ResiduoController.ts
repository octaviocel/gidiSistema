import { Residuo } from './../entity/Residuo';
import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';

const repo = AppDataSource.getRepository(Residuo);

export const createResiduo = async (req: Request, res: Response) => {
    const { name } = req.body;

    const insert = await Residuo.save({
        name: name
    })

    if (insert) return res.status(201).json({ residuo: insert });
    return res.status(100).json({ error: "There was an error" })
}

export const getResiduoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const residuo = await Residuo.findOneBy({ id: Number(id) });

    if (residuo) return res.status(200).json(residuo);

    return res.status(400).json({ error: "No waste." });
};

export const getAllResiduos = async (req: Request, res: Response) => {
    //const rolesFound = await Residuo.find();

    const residuos = await repo
        .createQueryBuilder('residuo')
        .orderBy('residuo.id', 'ASC')
        .getMany();

    //console.log(residuos)
    return res.status(200).json(residuos);
};

export const updateResiduo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const rolFound = await Residuo.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "No Waste.",
        });

    const rolUpdated = await repo
        .createQueryBuilder()
        .update({
            name
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

export const deleteResiduo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await Residuo.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No waste." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
};
