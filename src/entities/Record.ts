import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Record{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    dateTime!: string;

    @Column()
    text!: string;
    
}
