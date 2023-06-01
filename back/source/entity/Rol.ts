import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("rol")
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rolName!: string;


}