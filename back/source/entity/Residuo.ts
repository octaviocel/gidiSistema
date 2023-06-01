import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
    OneToOne,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Recoleccion } from './Recoleccion';

@Entity('residuo')
export class Residuo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Recoleccion, recoleccion => recoleccion.ubication)
    recolecciones!: Recoleccion[];
}