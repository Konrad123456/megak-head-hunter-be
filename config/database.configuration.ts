import { DataSource } from "typeorm"
import {User} from "../src/entities/User/User.entity";
import { Hr } from "../src/entities/hr/hr.entity";
import { StudentsData } from "../src/entities/studentsData/studentsData.entity";

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATA_HOST,
    port: Number(process.env.DATA_PORT),
    username: process.env.DATA_USERNAME,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATA_DATABASE,
    entities: [
        User, StudentsData, Hr
    ],
    entityPrefix: process.env.DATA_PREFIX,
    logging: process.env.APP_ENV !== 'prod',
    synchronize: process.env.APP_ENV !== 'prod',
})
