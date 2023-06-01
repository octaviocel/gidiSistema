import { RecoleccionCabecera } from './RecoleccionCabecera';
import { Residuo } from './Residuo';
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

@Entity('recoleccion')
export class Recoleccion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    dias!: number;

    @Column()
    estatus!: boolean;

    @OneToMany(type => RecoleccionCabecera, recoleccion => recoleccion.recoleccion, { onDelete: "CASCADE" })
    recolecciones!: RecoleccionCabecera[];

    // @Column({ name: "ubication_id" })
    // ubication_id!: number[];

    // @ManyToOne(() => Ubicacion, ubicacion => ubicacion.id,
    //     {
    //         eager: true,
    //         cascade: ["update"],
    //         nullable: false,
    //     }
    // )
    // @JoinColumn({ name: "ubicacion_id" })
    // ubication!: Ubicacion[];

    // @Column({ name: "residuos_id" })
    // residuos_id!: number[];
    // @ManyToOne(() => Residuo
    //     // , residuo => residuo.id,{
    //     //     eager: true,
    //     //     cascade: ["update"],
    //     //     nullable: false,
    //     // }
    // )
    // @JoinColumn({ name: "residuos_id" })
    // residuos!: Residuo[];

    @ManyToMany(() => Ubicacion, ubicacion => ubicacion.recolecciones)
    @JoinTable()
    ubication!: Ubicacion[];


    @ManyToMany(() => Residuo, residuo => residuo.recolecciones)
    @JoinTable()
    residuos!: Residuo[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}