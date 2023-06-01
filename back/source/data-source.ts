import { createRols, createSuperUser } from './DummyData';
import { _dbHost, _dbPort, _dbUser, _dbPassword, _dbName, _dbSync } from './constants';
import { DataSource } from "typeorm";
import tables from "./entity/tables";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: _dbHost,
    port: Number(_dbPort),
    username: _dbUser,
    password: _dbPassword,
    database: _dbName,
    ssl: false,
    entities: tables, //tablas
    logging: ['query', 'error'],
    synchronize: _dbSync,
    dropSchema: _dbSync,
});

export const connectDB = async () => {
    AppDataSource
        .initialize()
        .then(() => {
            console.log("Conectado BD")
            try {
                createRols().then(()=>{
                    createSuperUser().then(()=>{
                        console.log("Credenciales creadas");
                    });
                });
            } catch (error) {
                console.log(error);
            }
        })
        .catch((err: any) => {
            console.error(err);
        })
}