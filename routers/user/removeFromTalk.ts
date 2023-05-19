import { NextFunction, Request, Response } from 'express';
import { myDataSource } from '../../config/database.configuration';
import { UserPayloadData } from '../../utils/createTokens';
import { ToTalk } from '../../src/entities/toTalk/toTalk';
import { ValidationError } from '../../utils/errorsHandler';
import { staticText } from '../../language/en.pl';
import { StudentStatus } from '../../src/entities/types/studentsData';
import { StudentsData } from '../../src/entities/studentsData/studentsData.entity';
import { Roles } from '../../src/entities/types/Roles';
import { User } from '../../src/entities/User/User.entity';

type RequestAndPayloadUser = Request & UserPayloadData;

export const removeFromTalk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user as RequestAndPayloadUser;
    const StudentId = req.body.id;

    if (role !== Roles.HR) throw new ValidationError(staticText.validation.AccessDenied, 401);

    await myDataSource
      .createQueryBuilder()
      .select('totalk')
      .delete()
      .from(ToTalk)
      .where('hrId = :id', { id })
      .andWhere('students = :StudentId', { StudentId })
      .execute();

    const user = await myDataSource
      .getRepository(User)
      .findOneOrFail({ where: { id: StudentId }, relations: ['studentsData'] });

    await myDataSource
      .getRepository(StudentsData)
      .update({ id: user.studentsData.id }, { status: StudentStatus.AVAILABLE });

    res.json({ message: staticText.validation.message.Success })
  } catch (err) {
    next(err);
  }
}