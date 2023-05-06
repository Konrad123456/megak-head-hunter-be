import { NextFunction, Request, Response } from 'express';
import { myDataSource } from '../../config/database.configuration';
import { User } from '../../src/entities/User/User.entity';
import { UserPayloadData } from '../../utils/createTokens';
import { ValidationError } from '../../utils/errorsHandler';
import { staticText } from '../../language/en.pl';
import { Roles } from '../../src/entities/types/Roles';
import { ExtractDataToTalkList } from '../../utils/extractDataToTalkList';
import { StudntsToTalkListResposne } from '../../types';

type RequestAndPayloadUser = Request & UserPayloadData;

export const getToTalkList = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user as RequestAndPayloadUser;
  const limit = Number(req.params.limit);
  const page = (Number(req.params.page) - 1) * limit;

  if (role !== Roles.HR) throw new ValidationError(staticText.validation.AccessDenied, 401);

  const results = await myDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.toTalk', 'toTalk')
    .leftJoinAndSelect('user.studentsData', 'studentsData')
    .leftJoinAndSelect('user.studentsRating', 'studentsRating')
    .leftJoinAndSelect('user.toTalk', 'toTalk')
    .where(`toTalk.hrId = '${id}'`)
    .limit(limit)
    .offset(page)
    .getMany()

  if (!results) return res.json([]);

  const list: StudntsToTalkListResposne = results.map((r) => {
    const data = {
      ...r,
      ...r.studentsData,
      ...r.studentsRating,
      ...r.toTalk,
    }

    const result = new ExtractDataToTalkList(data).returnData();

    return result;
  })

  res.json(list);
}