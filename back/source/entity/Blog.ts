import { User } from './User';
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

@Entity('blog')
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    user_id!: number;

    @ManyToOne(() => User, user => user.id, {
        eager: true,
        cascade: ["update"],
        nullable: false,
    })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    title!: string;

    @Column()
    subtitle!: string;

    @Column()
    resume!: string;

    @Column()
    content!: string;

    @Column()
    principal!: boolean;

    @Column({ type: 'varchar', array: true })
    keywords!: string[];

    @Column({ type: 'varchar', array: true })
    photos!: string[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}