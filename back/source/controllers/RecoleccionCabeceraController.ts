import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';
import { RecoleccionCabecera } from "../entity/RecoleccionCabecera";

const repo = AppDataSource.getRepository(RecoleccionCabecera);

export const createRecoleccionCabecera = async (req: Request, res: Response) => {
    const {
        ubicacion_id,
        recoleccion_id,
        user_id, dia,
        peso_total,
        peso_cuartil,
        volumen
    } = req.body;

    const insert = await RecoleccionCabecera.save({
        ubicacion_id,
        recoleccion_id,
        user_id, dia,
        peso_total,
        peso_cuartil,
        volumen
    })

    if (insert) return res.status(201).json({ recoleccion: insert });
    return res.status(100).json({ error: "There was an error" })
}

export const getRecoleccionCabeceraById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const recoleccion = await RecoleccionCabecera.findOneBy({ id: Number(id) });

    if (recoleccion) return res.status(200).json(recoleccion);

    return res.status(400).json({ error: "No recoleccion." });
};



export const getRecoleccionByRecoleccionAndUbicacion = async (req: Request, res: Response) => {
    const { ubicacion, recoleccion } = req.params;

    //console.log(req.body)
    const busqueda = await repo
        .createQueryBuilder('recoleccion')
        .leftJoinAndSelect('recoleccion.user', 'user')
        .where("recoleccion.ubicacion_id = :ubicacionId", { ubicacionId: ubicacion })
        .andWhere("recoleccion.recoleccion_id = :recoleccionId", { recoleccionId: recoleccion })
        .orderBy('recoleccion.dia', 'ASC')
        .getMany();

    //console.log(busqueda)
    if (busqueda) return res.status(200).json(busqueda);

    return res.status(400).json({ error: "No recoleccion." });
}

export const getEstadisticaPrincipal = async (req: Request, res: Response) => {
    const { id } = req.params;

    const principales = await repo.createQueryBuilder('recoleccioncabecera')
        .select('recoleccioncabecera.ubicacion_id', 'ubicacion_id')
        .addSelect('recoleccioncabecera.recoleccion_id', 'recoleccion_id')
        .addSelect('SUM(recoleccioncabecera.peso_total)', 'total_peso')
        //.leftJoinAndSelect('recoleccioncabecera.ubication', 'ubicacion')
        .leftJoinAndSelect('recoleccioncabecera.ubication', "ubicacion", "ubicacion.id = recoleccioncabecera.ubicacion_id")
        //.from(RecoleccionCabecera, 'recoleccioncabecera')
        .where('recoleccioncabecera.recoleccion_id = :id', { id: id })
        .groupBy('recoleccioncabecera.ubicacion_id, recoleccioncabecera.recoleccion_id, ubicacion.id')
        .getRawMany();

    //console.log(principales)
    if (principales) return res.status(200).json(principales);

    return res.status(400).json({ error: "No recoleccion." });
}

export const getAllRecoleccionesCabeceras = async (req: Request, res: Response) => {
    const rolesFound = await RecoleccionCabecera.find();
    return res.status(200).json(rolesFound);
};

export const updateRecollecionCabeceras = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        ubicacion_id,
        recoleccion_id,
        user_id, dia,
        peso_total,
        peso_cuartil,
        volumen
    } = req.body;

    const rolFound = await RecoleccionCabecera.findOneBy({
        id: Number(id),
    });

    if (!rolFound)
        return res.status(400).json({
            error: "No Waste.",
        });

    const rolUpdated = await repo
        .createQueryBuilder()
        .update({
            ubicacion_id,
            recoleccion_id,
            user_id, dia,
            peso_total,
            peso_cuartil,
            volumen
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

export const deleteRecollecionCabecera = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipDeleted = await RecoleccionCabecera.delete({
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
