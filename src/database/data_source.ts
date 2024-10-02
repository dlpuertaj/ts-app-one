import { DataSource } from "typeorm";
import { Record } from "../entities/Record";

const AppDataSource = new DataSource({
    type:"sqlite",
    database:"database.sqlite",
    synchronize:true,
    logging: true,
    entities:[Record],
});

// You can define as many data sources as you nedd in your application

AppDataSource.initialize()
    .then(async () => {
        console.log('SQLite Database Connected!');
        
        const recordRepository = AppDataSource.getRepository(Record);
        let record = new Record();

        record.dateTime = '10022024';
        record.text = 'New Record';


        await recordRepository.save(record);

        console.log('Record inserted successfully!')

    })
    .catch((error) => console.log('Error while initializing the database: ', error));

export { AppDataSource };
