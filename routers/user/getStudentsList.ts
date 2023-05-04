import { NextFunction, Request, Response } from 'express';
import { Roles } from '../../src/entities/types/Roles';
import { ValidationError } from '../../utils/errorsHandler';
import { StudentsListResponse, UserActive } from '../../types/user.types';
import { myDataSource } from '../../config/database.configuration';
import { StudentStatus } from '../../src/entities/types/studentsData';
import { UserPayloadData } from '../../utils/createTokens';
import { ExtractDataToStudentsList } from '../../utils/extractDataToStudentsList';
import { User } from '../../src/entities/User/User.entity';

type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentsList = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user as RequestAndPayloadUser

  if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

  const limit = Number(req.params.limit);
  const page = (Number(req.params.page) - 1) * limit;

  const results = await myDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.studentsRating', 'studentsRating')
    .leftJoinAndSelect('user.studentsData', 'studentsData')
    .where(`user.role = '${Roles.STUDENT}'`)
    .andWhere(`user.isActive = '${UserActive.ACTIVE}'`)
    .andWhere(`studentsData.status = '${StudentStatus.AVAILABLE}'`)
    .orderBy('studentsData.lastName, studentsData.firstName')
    .limit(limit)
    .offset(page)
    .getMany();

  if (!results) return res.json([]);

  const list: StudentsListResponse = results.map((r) => {
    const data = {
      ...r,
      ...r.studentsData,
      ...r.studentsRating,
    }

    const result = new ExtractDataToStudentsList(data).returnData();

    return result;
  })

  res.json(list);
}
