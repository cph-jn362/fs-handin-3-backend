import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from 'src/auth/entities/tenant.entity';


@Entity('problems')
export class ProblemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;
    
    @Column()
    description: string;

    @Column({nullable: true})
    imgUrl: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.problem)
    tenant: Tenant;
}
