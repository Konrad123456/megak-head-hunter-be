import { Strategy } from "../types";
import fs from "fs";
import { parse } from "fast-csv";
import { MulterConstants } from "../../../../config/multer.configuration";
import { StudentsRatingWithEmail } from "../../../entities/types/studentsRating";
import {ImportStudentsToDB} from "../ImportStudentsContext";

export class ImportFromCsv implements Strategy {
    private dbImporter: ImportStudentsToDB;

    constructor(dbImporter: ImportStudentsToDB) {
        this.dbImporter = dbImporter;
    }

    public importData = async (file: Express.Multer.File): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const studentsData: StudentsRatingWithEmail[] =[];

            if(file && file.originalname) {
                 fs.createReadStream(MulterConstants.UPLOAD_FILE_DIR + file.originalname)
                    .pipe(parse({ objectMode: true, headers: true }))
                    .on('error', error => console.error(error))
                    .on('data', (row: StudentsRatingWithEmail) => {
                        studentsData.push(row)
                    })
                    .on('end', async () => {
                        const result = await this.dbImporter.importToDb(studentsData);
                        fs.unlinkSync(MulterConstants.UPLOAD_FILE_DIR + file.originalname);
                        resolve(result);
                    });
            }
        })
    }

}