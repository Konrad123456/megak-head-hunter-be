export interface Strategy {
    importData(file: Express.Multer.File): Promise<boolean>;
}