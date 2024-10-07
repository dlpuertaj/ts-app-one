import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Record{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:'datetime'})
    dateTime!: Date;

    @Column()
    text!: string;
    
}
