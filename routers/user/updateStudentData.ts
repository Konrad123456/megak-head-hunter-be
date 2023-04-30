import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { myDataSource } from "../../config/database.configuration";
import { StudentsDataInterface } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";
import { StudentsData } from "../../src/entities/studentsData/studentsData.entity";
import { validate } from "class-validator";

type RequestAndPayloadUser = Request & UserPayloadData;

const validationErrorOptions = {
  validationError: {
    target: false
  }
}

export const updateStudentData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user as RequestAndPayloadUser;
    const dataFE = req.body as StudentsDataInterface;

    if (role !== Roles.STUDENT) throw new ValidationError('Access denied.', 401);

    const foundStudentData = await myDataSource.getRepository(StudentsData).findOneBy({ id });

    if (!foundStudentData) throw new ValidationError('Incorrect id.', 401);

    let item: keyof StudentsDataInterface;

    for (item in dataFE) {
      if (foundStudentData.hasOwnProperty(item) && item !== 'id') {
        (foundStudentData[item] as any) = dataFE[item];
      }
    }

    const errors = await validate(foundStudentData, validationErrorOptions);

    if (errors.length) {
      const message = errors.map(err => {
        if (!err.constraints) return;

        const [, val] = Object.entries(err.constraints)[0];

        return val;
      }).join('; ');

      throw new ValidationError(message, 401);
    }

    const result = await myDataSource
      .createQueryBuilder()
      .update(StudentsData)
      .set({ ...foundStudentData })
      .where('id = :id', { id })
      .execute();

    if (!result) throw new ValidationError('Internal Server Error', 500);

    res.json({ message: 'Done.' });
  } catch (err) {
    next(err);
  }
}
