import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity()
export class Record{

    @PrimaryGeneratedColumn()
    private id!: number;

    @CreateDateColumn({type:'datetime'})
    private dateTime!: Date;

    @Column()
    private text!: string;

    get getDatabaseId(){
        if(this.id){
            return this.id;
        }
        throw new Error('No Id found');
    }

    get createdDateTime(){
        if(this.dateTime){
            return this.dateTime;
        }
        throw new Error('No date found');
    }
 
    set setDateTime(dateTime:Date){
        this.dateTime = dateTime;
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
