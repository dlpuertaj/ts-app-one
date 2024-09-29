import { DataSource } from "typeorm";
import { Record } from "../entities/Record";

const AppDataSource = new DataSource({
    type:"sqlite",
    database:"database.sqlite",
    synchronize:true,
    logging: true,
    entities:[Record],
});

AppDataSource.initialize().then(() => {
    console.log('SQLite Database Connected!')
}).catch((error) => console.log('Error: ', error));

export { AppDataSource };
