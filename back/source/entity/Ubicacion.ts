import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from 'typeorm';
import { Recoleccion } from './Recoleccion';

@Entity('ubicacion')
export class Ubicacion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Recoleccion, recoleccion => recoleccion.ubication)
    recolecciones!: Recoleccion[];
}