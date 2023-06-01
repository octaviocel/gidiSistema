import { Tip } from './../entity/Tips';
import { AppDataSource } from './../data-source';
import { Request, Response } from 'express';

const repo = AppDataSource.getRepository(Tip)

export const createTip = async (req: Request, res: Response) => {
    try {
        const { user_id, title, content } = req.body;

        const insert = await Tip.save({
            title: title,
            user_id: Number(user_id),
            content: content,
        })

        if (insert) {
            return res.status(200).json({ insert })
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ error: "There was an error" });
    }

}

export const getTipById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const tipFound = await Tip.findOneBy({ id: Number(id) });

    if (tipFound) return res.status(200).json(tipFound);

    return res.status(400).json({ error: "No Tip." });
}

export const getAllTips = async (req: Request, res: Response) => {
    const tips = await Tip.find();
    if (tips) res.status(200).json(tips)
    return res.status(400).json({ error: "No Tips." });
}

export const updateTip = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, title, content } = req.body;

    const tip = await Tip.findOneBy({
        id: Number(id),
    });

    if (!tip) {
        return res.status(400).json({
            error: "No Tip"
        })
    }

    const tipUpdate = await repo
        .createQueryBuilder()
        .update({
            user_id, title, content
        })
        .where({
            id: tip.id
        })
        .returning("*")
        .execute()

    if (tipUpdate.affected === 0) {
        return res.status(400).json({ error: "There was an error updating." });
    }

    return res.status(201).json({ ubicacion: tipUpdate.raw[0] })
}

export const deleteTip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await Tip.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete"} );
        }
        return res.status(400).json({ error: "No tip." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
}