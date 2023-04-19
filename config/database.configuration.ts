import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATA_HOST,
    port: Number(process.env.DATA_PORT),
    username: process.env.DATA_USERNAME,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATA_DATABASE,
    entities: [

    ],
    entityPrefix: process.env.DATA_PREFIX,
    logging: true,
    synchronize: true,
})
