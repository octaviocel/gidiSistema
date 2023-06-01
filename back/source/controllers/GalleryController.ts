import { Gallery } from './../entity/Gallery';
import { AppDataSource } from './../data-source';
import { Request, Response } from 'express';
import { getImagen } from './ImagesController';

const repo = AppDataSource.getRepository(Gallery)

export const createGallery = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            title,
            photos,
        } = req.body;

        const insert = await Gallery.save({
            user_id: Number(user_id),
            title,
            photos,
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

export const getGalleryById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const tipFound = await Gallery.findOneBy({ id: Number(id) });

    if (tipFound) return res.status(200).json(tipFound);

    return res.status(400).json({ error: "No Gallery." });
}

export const getAllGalley = async (req: Request, res: Response) => {
    const tips = await Gallery.find();
    if (tips) return res.status(200).json(tips)
    return res.status(400).json({ error: "No Gallery." });
}

export const getAllGalleryPublic = async (req: Request, res: Response) => {
    const gallery = await repo
        .createQueryBuilder("g")
        .leftJoin("g.user", "user")
        //.select("COUNT(*)", "count")
        .addSelect("g")
        .addSelect(["user.firstName", "user.lastName", "user.motherLastName"])
        //.where("blog.principal = :principal", { principal: true })
        .getMany()

    if (gallery) {
        for (const element of gallery) {
            try {
                for (let index = 0; index < element.photos.length; index++) {
                    element.photos[index] = (await getImagen(element.photos[index])).toString();
                }
            } catch (error) {
                return res.status(400).json({ error: "There was an error." });
            }

        }

        return res.status(200).json(gallery)
    }
    else {
        return res.status(400).json({ error: "No Gallery." });
    }
}

export const updateGallery = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        title,
        photos,
    } = req.body;

    const tip = await Gallery.findOneBy({
        id: Number(id),
    });

    if (!tip) {
        return res.status(400).json({
            error: "No Gallery"
        })
    }

    const tipUpdate = await repo
        .createQueryBuilder()
        .update({
            title,
            photos,
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

export const deleteGallery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await Gallery.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No Gallery." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
}