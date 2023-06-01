import { Blog } from '../entity/Blog';
import { AppDataSource } from './../data-source';
import { Request, Response } from 'express';
import { getImage, getImagen } from './ImagesController';

const repo = AppDataSource.getRepository(Blog)

export const createBlog = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            title,
            subtitle,
            resume,
            content,
            keywords,
            photos,
            principal
        } = req.body;

        const insert = await Blog.save({
            user_id: Number(user_id),
            title,
            subtitle,
            resume,
            content,
            keywords,
            photos,
            principal
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

export const getBlogById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const tipFound = await Blog.findOneBy({ id: Number(id) });

    if (tipFound) return res.status(200).json(tipFound);

    return res.status(400).json({ error: "No Blog." });
}

export const getAllBlogs = async (req: Request, res: Response) => {
    const tips = await Blog.find();
    if (tips) {
        return res.status(200).json(tips)
    }
    else {
        return res.status(400).json({ error: "No Blogs." });
    }
}

export const getPrincipalBlogs = async (req: Request, res: Response) => {

    const blogs = await repo
        .createQueryBuilder("blog")
        .leftJoin("blog.user", "user")
        //.select("COUNT(*)", "count")
        .addSelect("blog")
        .addSelect(["user.firstName", "user.lastName", "user.motherLastName"])
        .where("blog.principal = :principal", { principal: true })
        .getMany()

    if (blogs) {
        for (const element of blogs) {
            try {
                for (let index = 0; index < element.photos.length; index++) {
                    element.photos[index] = (await getImagen(element.photos[index])).toString();
                }
            } catch (error) {
                return res.status(400).json({ error: "There was an error." });
            }

        }

        return res.status(200).json(blogs)
    }
    else {
        return res.status(400).json({ error: "No Blogs." });
    }

}

export const getBlogPagination = async (req: Request, res: Response) => {
    const itemsPerPage = 4;

    const totalItems = await repo.count();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentPage = Number(req.params.currentPage) || 1;



    const offset = (currentPage - 1) * itemsPerPage;

    const queryBuilder = repo
        .createQueryBuilder('blog')
        .leftJoin("blog.user", "user")
        .addSelect("blog")
        .addSelect(["user.firstName", "user.lastName", "user.motherLastName"]);

    const results = await queryBuilder
        .orderBy('blog.createdAt', 'DESC')
        .skip(offset)
        .take(itemsPerPage)
        .getMany();

    if (results) {
        res.json({
            results,
            pagination: {
                currentPage,
                totalPages,
                totalItems,
            },
        });
    } else {
        return res.status(400).json({
            error: "No Blog"
        })
    }

}

export const updatePrincipalBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        principal,
    } = req.body;

    if (principal === false) {
        const tip = await Blog.findOneBy({
            id: Number(id),
        });

        if (!tip) {
            return res.status(400).json({
                error: "No Blog"
            })
        }

        const tipUpdate = await repo
            .createQueryBuilder()
            .update({
                principal
            })
            .where({
                id: tip.id
            })
            .returning("*")
            .execute()

        if (tipUpdate.affected === 0) {
            return res.status(400).json({ error: "There was an error updating." });
        }

        return res.status(201).json({ blog: tipUpdate.raw[0] })
    } else {
        const count = await repo
            .createQueryBuilder("blog")
            .select("COUNT(*)", "count")
            .where("blog.principal = :principal", { principal: true })
            .getRawOne()


        if (count.count < 3) {
            const tip = await Blog.findOneBy({
                id: Number(id),
            });

            if (!tip) {
                return res.status(400).json({
                    error: "No Blog"
                })
            }

            const tipUpdate = await repo
                .createQueryBuilder()
                .update({
                    principal
                })
                .where({
                    id: tip.id
                })
                .returning("*")
                .execute()

            if (tipUpdate.affected === 0) {
                return res.status(400).json({ error: "There was an error updating." });
            }

            return res.status(201).json({ blog: tipUpdate.raw[0] })
        } else {
            return res.status(400).json({ error: "No se pueden agregar más, el límite es 3." });
        }
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id,
        title,
        subtitle,
        resume,
        content,
        keywords,
        photos,
        principal,
    } = req.body;

    const tip = await Blog.findOneBy({
        id: Number(id),
    });

    if (!tip) {
        return res.status(400).json({
            error: "No Blog"
        })
    }

    const tipUpdate = await repo
        .createQueryBuilder()
        .update({
            title,
            subtitle,
            resume,
            content,
            keywords,
            photos,
            principal
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

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await Blog.delete({
            id: Number(id),
        });

        if (tipDeleted) {
            if (tipDeleted.affected == 0)
                return res.status(400).json({ error: "There was an error deleting." });

            return res.status(200).json({ id: id + " Successfully delete" });
        }
        return res.status(400).json({ error: "No Blog." });
    } catch (error) {
        return res.status(400).json({ error: "There was an error deleting." });
    }
}