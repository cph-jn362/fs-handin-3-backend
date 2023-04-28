import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string
    
    @Column()
    done: boolean
    
}