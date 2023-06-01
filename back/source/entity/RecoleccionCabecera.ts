import { Recoleccion } from './Recoleccion';
import { Ubicacion } from './Ubicacion';
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
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('recoleccioncabecera')
export class RecoleccionCabecera extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "ubicacion_id" })
    ubicacion_id!: number;
    
    @ManyToOne(() => Ubicacion, ubicacion => ubicacion.id,{
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({ name: "ubicacion_id" })
    ubication!: Ubicacion;

    @Column({ name: "recoleccion_id" })
    recoleccion_id!: number;
    
    @ManyToOne(() => Recoleccion, recoleccion => recoleccion.recolecciones,{
        eager: true,
        cascade: ["update"],
        nullable: false,
        orphanedRowAction : "delete"
    })
    @JoinColumn({ name: "recoleccion_id" })
    recoleccion!: Recoleccion;

    @Column({name: "user_id"})
    user_id!:number;

    @ManyToOne(()=> User, user => user.id, {
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({name: "user_id"})
    user!: User;

    @Column()
    dia!:number;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    peso_total!:number;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    peso_cuartil!:number;

    @Column()
    volumen!:string;


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}