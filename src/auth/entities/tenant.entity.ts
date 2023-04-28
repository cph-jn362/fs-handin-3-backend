import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { Role } from "src/users/role";
import { ProblemEntity } from "src/problems/entities/problem.entity";

@Entity()
export class Tenant{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

    @OneToMany(() => ProblemEntity, (problemEntity) => problemEntity.tenant)
    problem: ProblemEntity;
}

