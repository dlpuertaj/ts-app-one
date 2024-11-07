import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity()
export class Record{

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({type:'datetime'})
    dateTime!: Date;

    @Column()
    text!: string;
    
}
