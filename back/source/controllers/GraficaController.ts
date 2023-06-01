import { Ubicacion } from './../entity/Ubicacion';
import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';
import { RecoleccionCabecera } from "../entity/RecoleccionCabecera";
import { ResiduoPeriodo } from '../entity/ResiduoPeriodo';
import { Residuo } from '../entity/Residuo';
import { getRepository } from 'typeorm';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

const repo = AppDataSource.getRepository(RecoleccionCabecera);


export const getRecoleccionGrafica = async (req: Request, res: Response) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const query = repo.createQueryBuilder('c')
            .select('DISTINCT c.ubicacion_id', 'ubicacion_id')
            .where('c.recoleccion_id = :id', { id })
            .getRawMany();

        const result = await query;
        const ubicacionesPromises = result.map(async (row) => await Ubicacion.findOneBy({ id: row.ubicacion_id }));
        const ubicaciones = await Promise.all(ubicacionesPromises);

        const response: { [key: string]: { id: number; nombre: string; datos: { dias: any[]; peso_total: any[]; peso_cuartil: any[]; } } } = {};


        for (const ubicacionId of ubicaciones) {
            //const subQuery = repo.createQueryBuilder('c')
            if (ubicacionId) {
                const query = await repo.createQueryBuilder('c')
                    .select('c.dia', 'dia')
                    .addSelect('c.peso_total', 'peso_total')
                    .addSelect('c.peso_cuartil', 'peso_cuartil')
                    .where('c.recoleccion_id = :recoleccionId', { recoleccionId: id })
                    .andWhere('c.ubicacion_id = :ubicacionId', { ubicacionId: ubicacionId?.id })
                    .groupBy('c.dia, c.peso_total, c.peso_cuartil')
                    .getRawMany();

                const ubicacion = {
                    id: ubicacionId?.id,
                    nombre: ubicacionId?.name,
                    datos: {
                        dias: query.map((row: any) => row.dia),
                        peso_total: query.map((row: any) => row.peso_total),
                        peso_cuartil: query.map((row: any) => row.peso_cuartil)
                    }
                };

                response[ubicacionId.id] = ubicacion;
            }
        }

        res.json(response);

    }
    catch (error) {
        console.error('Error al ejecutar la consulta', error);
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
    }
}

export const getSumaRecoleccionGrafica = async (req: Request, res: Response) => {
    // Obtener los IDs de la recolección cabecera
    try {
        const { id } = req.params;
        const recoleccionId = id;

        const repoRecoleccionCabecera = AppDataSource.getRepository(RecoleccionCabecera);
        const repoResiduoPeriodo = AppDataSource.getRepository(ResiduoPeriodo);
        const repoResiduo = AppDataSource.getRepository(Residuo);

        const recoleccionCabeceraIds = await repoRecoleccionCabecera
            .createQueryBuilder('c')
            .select('c.id')
            .where('c.recoleccion_id = :recoleccionId', { recoleccionId })
            .getMany();

        const result = await repoResiduoPeriodo
            .createQueryBuilder('rp')
            .select('r.name', 'name')
            .addSelect('SUM(rp.quantity)', 'total_quantity')
            .innerJoin(Residuo, 'r', 'r.id = rp.waste_id')
            .where('rp.collection_id IN (:...recoleccionIds)', { recoleccionIds: recoleccionCabeceraIds.map(c => c.id) })
            .groupBy('r.name')
            .getRawMany();

        const resp =
        {
            peso_total: result.map((row: any) => row.name),
            peso_cuartil: result.map((row: any) => row.total_quantity)
        }

        res.json(resp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los residuos totales' });
    }
};

export const getCSVResiduos = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recoleccionId = id;

        const result = await RecoleccionCabecera.createQueryBuilder('c')
            .select('c.id, c.dia, c.peso_total, c.peso_cuartil, c.volumen, u.name as ubicacion, "user"."firstName" as usuario')
            .leftJoin('c.ubication', 'u')
            .leftJoin('c.user', 'user')
            .where('c.recoleccion_id = :recoleccionId', { recoleccionId })
            .getRawMany();

        // console.log(result)
        const csvWriter = createObjectCsvWriter({
            path: 'resultados.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'dia', title: 'Dia' },
                { id: 'peso_total', title: 'Peso Total' },
                { id: 'peso_cuartil', title: 'Peso Cuartil' },
                { id: 'volumen', title: 'Volumen' },
                { id: 'ubicacion', title: 'Ubicacion' },
                { id: 'usuario', title: 'Usuario' },
            ],
        });

        //await csvWriter.writeRecords(result);

        const filePath = path.join('C:\\Users\\Octavio\\Desktop\\Steam\\back\\src', '..', 'resultados.csv');

        await csvWriter.writeRecords(result);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener csv totales' });

    }
}

export const getCSVResiduos2 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recoleccionId = id;
        const repoResiduoPeriodo = AppDataSource.getRepository(ResiduoPeriodo);

        const query = repoResiduoPeriodo
            .createQueryBuilder('p')
            .select('p.id, p.quantity as cantidad, r.name as residuo, re.dia, u.name as ubicacion')
            .innerJoin('p.waste', 'r')
            .innerJoin('p.collection', 're')
            .innerJoin('re.ubication', 'u')
            .where('recoleccion_id = :recoleccionId', { recoleccionId });

        const result = await query.getRawMany();

        //console.log(result)
        const csvWriter = createObjectCsvWriter({
            path: 'resultadosXdia.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'cantidad', title: 'Cantidad (kg)' },
                { id: 'residuo', title: 'Residuo' },
                { id: 'dia', title: 'Dia' },
                { id: 'ubicacion', title: 'Ubicacion' },
            ],
        });

        //await csvWriter.writeRecords(result);

        const filePath = path.join('C:\\Users\\Octavio\\Desktop\\Steam\\back\\src', '..', 'resultadosXdia.csv');

        await csvWriter.writeRecords(result);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener csv totales' });

    }
}