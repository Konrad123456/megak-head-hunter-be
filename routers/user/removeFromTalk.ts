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

export const removeFromTalk = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user as RequestAndPayloadUser;
  const StudentId = req.body.id;

 

  res.json({ message: staticText.validation.message.Success })
}