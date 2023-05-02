import {Router} from "express";
import {SupportedMineTypeFile, upload} from "../config/multer.configuration";
import {ValidationError} from "../utils/errorsHandler";
import {ImportFromCsv} from "../src/services/importStudents/Strategy/ImportFromCsv";
import {ImportStudentsToDB} from "../src/services/importStudents/ImportStudentsContext";
import {ImportFromJSON} from "../src/services/importStudents/Strategy/ImportFromJSON";
import {staticText} from '../language/en.pl';

export const uploadRouter = Router()
    .post('/', upload.single('students'), async (req, res) => {
        const file = req.file;

        if (!file) return;

        switch (file?.mimetype) {
            case SupportedMineTypeFile.CSV: {
                const importer = new ImportFromCsv(new ImportStudentsToDB());
                await importer.importData(file);
                break;
            }
            case SupportedMineTypeFile.JSON: {
                const importer = new ImportFromJSON(new ImportStudentsToDB());
                await importer.importData(file);
                break;
            }
            default:
                throw new ValidationError(staticText.errors.SupportFilesCsvJson);
        }

        return res.json({ success: true })
    })