import { DataSource } from "typeorm";
import { Record } from "../entities/Record";
import { Button } from "../entities/Button";

const AppDataSource = new DataSource({
    type:"sqlite",
    database:"database.sqlite",
    synchronize:true,
    logging: false,
    entities:[Record, Button],
});

// You can define as many data sources as you nedd in your application

AppDataSource.initialize()
    .then(async () => {
        console.log('SQLite Database Connected!');
    })
    .catch((error) => console.log('Error while initializing the database: ', error));

export { AppDataSource };
