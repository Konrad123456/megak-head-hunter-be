import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { myDataSource } from "../../config/database.configuration";
import { UserPayloadData } from "../../utils/createTokens";
import { StudentsData } from "../../src/entities/studentsData/studentsData.entity";
import { staticText } from "../../language/en.pl";
import { User } from "../../src/entities/User/User.entity";
import { StudentStatus, UserActive } from "../../types";

type RequestAndPayloadUser = Request & UserPayloadData;

export const studentHired = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as RequestAndPayloadUser;
    const studentId = req.params.id;

    if (role !== Roles.STUDENT && role !== Roles.HR) throw new ValidationError(staticText.validation.AccessDenied, 401);

    const user = await myDataSource
      .getRepository(User)
      .findOneOrFail({ where: { id: studentId }, relations: ['studentsData'] });

    if (!user) throw new ValidationError(staticText.validation.InvalidData, 401);
    
    const foundStudentData = await myDataSource.getRepository(StudentsData).findOneBy({ id: user.studentsData.id })
    
    if (!foundStudentData) throw new ValidationError(staticText.validation.InvalidData, 401);

    const result = await myDataSource
      .createQueryBuilder()
      .update(StudentsData)
      .set({ status: StudentStatus.HIRED })
      .where('id = :id', { id: foundStudentData.id })
      .execute();

    if (!result) throw new ValidationError(staticText.errors.InternalServerError, 500);

    const result2 = await myDataSource
      .createQueryBuilder()
      .update(User)
      .set({ isActive: UserActive.NOT_ACTIVE })
      .where('id = :id', { id: studentId })
      .execute();

    if (!result2) throw new ValidationError(staticText.errors.InternalServerError, 500);

    res.json({ message: staticText.validation.message.Success });
  } catch (err) {
    next(err);
  }
}
