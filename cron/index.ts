import cron from 'node-cron';
import { myDataSource } from "../config/database.configuration";
import { ToTalk } from "../src/entities/toTalk/toTalk";

export const removeStudentsFromHr = cron.schedule("* */12 * * *",async () => {
    console.log("---------------------");
    console.log("running a task to remove students from hr");
    console.log("---------------------");

    const currentDate = new Date().toISOString();

    await myDataSource
        .createQueryBuilder()
        .delete()
        .from(ToTalk)
        .where("toDate <= :toDate", { toDate: currentDate })
        .execute();

    console.log("---------------------");
    console.log("finished");
    console.log("---------------------");
});