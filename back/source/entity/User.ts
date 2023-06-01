import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Rol } from './Rol';

@Entity("user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ nullable: true })
    motherLastName!: string;

    @Column({ type: "boolean", default: false })
    blocked!: Boolean;

    @Column({ name: "rol_id" })
    rol_id!: number;

    @ManyToOne(() => Rol, (rol) => rol.id, {
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({ name: "rol_id" })
    rol!: Rol;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


}