import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity()
export class Button{
    
    @PrimaryGeneratedColumn()
    private id!: number;

    @Column()
    private name!: string;

    @Column()
    private text!: string;

    constructor(name:string, text:string){
        this.name = name;
        this.text = text;
    }

    get getDatabaseId(){
        if(this.id){
            return this.id;
        }
        throw new Error('No Id found');
    }

    get getName(){
        if(this.name){
            return this.name;
        }
        throw new Error('No name found');
    }

    set setName(name:string){
        this.name = name;
    }

    get getText(){
        if(this.text){
            return this.text;
        }
        throw new Error('No text registered');
    }

    set setText(text:string){
        this.text = text;
    }

}