import { NextFunction, Request, Response } from 'express';
import { myDataSource } from '../../config/database.configuration';
import { User } from '../../src/entities/User/User.entity';
import { UserPayloadData } from '../../utils/createTokens';
import { ToTalk } from '../../src/entities/toTalk/toTalk';
import { ValidationError } from '../../utils/errorsHandler';
import { staticText } from '../../language/en.pl';
import { Roles } from '../../src/entities/types/Roles';
import { StudentStatus } from '../../src/entities/types/studentsData';
import { StudentsData } from '../../src/entities/studentsData/studentsData.entity';

type RequestAndPayloadUser = Request & UserPayloadData;

export const getToTalkList = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user as RequestAndPayloadUser;
  const limit = Number(req.params.limit);
  const page = (Number(req.params.page) - 1) * limit;
  console.log(id);
  
  if (role !== Roles.HR) throw new ValidationError(staticText.validation.AccessDenied, 401);

  const hr = await myDataSource
    .getRepository(User)
    .findOneBy({ id });

  const student = await myDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.toTalk', 'toTalk')
    .leftJoinAndSelect('user.studentsData', 'studentsData')
    .leftJoinAndSelect('user.studentsRating', 'studentsRating')
    .where(`toTalk.hrId = '${id}'`)
    .limit(limit)
    .offset(page)
    .getMany()



  res.json({ student });
}