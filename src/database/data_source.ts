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
    })
    .catch((error) => console.log('Error while initializing the database: ', error));

export { AppDataSource };
