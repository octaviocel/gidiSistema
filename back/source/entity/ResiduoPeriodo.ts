import { ManyToOne, UpdateDateColumn } from 'typeorm';
import { Residuo } from './Residuo';
import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { Entity } from 'typeorm';
import { RecoleccionCabecera } from './RecoleccionCabecera';

@Entity('residuoperiodo')
export class ResiduoPeriodo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "collection_id" })
    collection_id!: number;

    @ManyToOne(() => RecoleccionCabecera, recoleccion => recoleccion.id,{
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({ name: "collection_id" })
    collection  !: RecoleccionCabecera;

    @Column({ name: "waste_id" })
    waste_id!: number;

    @ManyToOne(() => Residuo, residuo => residuo.id,{
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({ name: "waste_id" })
    waste!: Residuo;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    quantity!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}