import { ResiduoPeriodo } from './../entity/ResiduoPeriodo';
import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';

const repo = AppDataSource.getRepository(ResiduoPeriodo);

export const createPeriodo = async (req: Request, res: Response) => {
    const { collection_id, waste_id, quantity, date } = req.body;

    const insert = await ResiduoPeriodo.save({
        collection_id, 
        waste_id, 
        quantity, 
    })

    if (insert) return res.status(201).json({ ResiduoPeriodo: insert });
    return res.status(100).json({ error: "There was an error" })
}

export const getPeriodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const residuo = await ResiduoPeriodo.findOneBy({ id: Number(id) });

    if (residuo) return res.status(200).json(residuo);

    return res.status(400).json({ error: "No period." });
};

export const getAllPeriodos = async (req: Request, res: Response) => {
    const rolesFound = await ResiduoPeriodo.find();
    return res.status(200).json(rolesFound);
};

export const getPeriodoxCabeceraId =async (req: Request, res: Response) => {
    const {id} = req.params;

    const hoja = await repo
    .createQueryBuilder('periodo')
    .leftJoinAndSelect('periodo.waste','basura')
    .where({
        collection_id: id,
    })
    .getMany()

    if (hoja) return res.status(200).json(hoja);

    return res.status(400).json({ error: "No periodos." });
}

export const updatePeriodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const rolFound = await ResiduoPeriodo.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "No Waste.",
        });

    const rolUpdated = await repo
        .createQueryBuilder()
        .update({
            quantity
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

export const deletePeriodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await ResiduoPeriodo.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No period." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
};
