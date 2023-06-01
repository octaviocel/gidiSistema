import "reflect-metadata";
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import { AppDataSource, connectDB } from "./data-source";
import cors from 'cors';

import BlogRoutes from './routes/BlogRoutes';
import GalleryRoutes from './routes/GalleryRoutes';
import ImagesRoutes from './routes/ImagesRoutes';
import PeriodoRoutes from './routes/PeriodoRoutes';
import RecoleccionRoutes from './routes/RecoleccionRoutes';
import ResiduoRoutes from './routes/ResiduoRoutes';
import TipsRoutes from './routes/TipsRoutes';
import UbicacionRoutes from './routes/UbicacionRoutes';
import UserRoutes from './routes/UserRoutes';
import RolRoutes from './routes/RolRoutes';
import RecoleccionesCabeceraRoutes from './routes/RecoleccionCabeceraRoutes';
import GraficasRoutes from './routes/GraficasRoutes';

const main = async () => {
    await connectDB();

    const app: Express = express();

    app.use(morgan('dev'));

    app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

    app.use(cors({
        credentials: true,
        origin: "*",
    }));

    // app.use(
    //     cors({
    //       credentials: true,
    //       origin: "*",
    //     })
    //   );
    // Esperar las rutas aqui
    app.use(BlogRoutes);
    app.use(GalleryRoutes);
    app.use(ImagesRoutes);
    app.use(PeriodoRoutes);
    app.use(RecoleccionRoutes);
    app.use(ResiduoRoutes);
    app.use(TipsRoutes);
    app.use(UbicacionRoutes);
    app.use(UserRoutes);
    app.use(RolRoutes);
    app.use(RecoleccionesCabeceraRoutes);
    app.use(GraficasRoutes);

    // app.use((req, res, next) => {
    //     const error = new Error('not found');
    //     return res.status(404).json({
    //         message: error.message
    //     });

    // });

    //const httpServer = http.createServer(app);

    const PORT: Number = Number(process.env.PORT);

    app.listen(PORT);
    //console.log("Listening on port: ", _apiPort);
    console.log(`The server is running on port ${PORT}`)
    //httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
}

main();