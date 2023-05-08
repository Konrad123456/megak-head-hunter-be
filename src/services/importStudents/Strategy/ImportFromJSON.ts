import { Strategy } from "../types";
import fs from "fs";
import { MulterConstants } from "../../../../config/multer.configuration";
import { StudentsRatingWithEmail } from "../../../entities/types/studentsRating";
import {ImportStudentsToDB} from "../ImportStudentsContext";
import {ImportFileValidator} from "../../../../utils/Validators/ImportFileValidator";

export class ImportFromJSON implements Strategy {
    private dbImporter: ImportStudentsToDB;

    constructor(dbImporter: ImportStudentsToDB) {
        this.dbImporter = dbImporter;
    }

    public importData = async (file: Express.Multer.File): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const studentsData: StudentsRatingWithEmail[] =[];

            if(file && file.originalname) {
                 fs.createReadStream(MulterConstants.UPLOAD_FILE_DIR + file.originalname)
                    .on('error', error => console.error(error))
                    .on('data', async (row) => {
                        const data = JSON.parse(row as string);
                        //@ts-ignore
                        new ImportFileValidator(...data);
                        studentsData.push(...data);
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