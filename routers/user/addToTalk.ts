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

export const addToTalk = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user as RequestAndPayloadUser;
  const StudentId = req.body.id;

  try {
    if (role !== Roles.HR) throw new ValidationError(staticText.validation.AccessDenied, 401);

    const student = await myDataSource
      .getRepository(User)
      .findOneOrFail({ where: { id: StudentId }, relations: ['studentsData', 'studentsRating'] });

    if (student.studentsData.status === StudentStatus.DURING_CONVERSATION) return res.json({ message: staticText.validation.message.StudentReserved })
    if (student.studentsData.status === StudentStatus.HIRED) return res.json({ message: staticText.validation.message.StudentWasHired });

    const toTalk = new ToTalk();
    toTalk.toDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    toTalk.hrId = id;
    toTalk.students = student;

    await myDataSource.manager.save(toTalk);
    await myDataSource.getRepository(StudentsData).update({ id: student.studentsData.id }, { status: StudentStatus.DURING_CONVERSATION });

    res.json({ message: staticText.validation.message.Success })
  } catch (err) {
    next(err);
  }
}