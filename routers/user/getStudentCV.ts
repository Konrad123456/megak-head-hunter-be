import { NextFunction, Request, Response } from 'express';
import { Roles } from '../../src/entities/types/Roles';
import { ValidationError } from '../../utils/errorsHandler';
import { myDataSource } from '../../config/database.configuration';
import { UserPayloadData } from '../../utils/createTokens';
import { ExtractDataToStudentsCV } from '../../utils/extractDataToStudentsCV';
import { User } from '../../src/entities/User/User.entity';

type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as RequestAndPayloadUser;

    if (role !== Roles.HR && role !== Roles.STUDENT) throw new ValidationError('Access denied.', 401);

    const userId = req.params.id;

    const results = await myDataSource
      .getRepository(User).findOneOrFail({ where: { id: userId }, relations: ['studentsData', 'studentsRating'] });

    if (!results) return res.json([]);

    const data = {
      ...results.studentsData,
      ...results.studentsRating,
      ...results,
    }

    const userCV = new ExtractDataToStudentsCV(data).returnData();

    res.json(userCV);
  } catch (err) {
    next(err);
  }
}
