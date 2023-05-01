import multer from "multer";

export enum MulterConstants {
    UPLOAD_FILE_DIR = './uploads/',
}

export enum SupportedMineTypeFile {
    CSV = 'text/csv',
    JSON = 'application/json',
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, MulterConstants.UPLOAD_FILE_DIR)
    },
    filename: (req, file, callBack) => {
        callBack(
            null,
            file.originalname,
        )
    },
})

export const multerConfig = {
    storage: storage,
}

export const upload = multer(multerConfig)
