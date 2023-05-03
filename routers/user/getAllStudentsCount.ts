import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { myDataSource } from "../../config/database.configuration";
import { StudentStatus } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";
import { User } from "../../src/entities/User/User.entity";
import { UserActive } from "../../types";

type RequestAndPayloadUser = Request & UserPayloadData;

export const getAllStudentsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as RequestAndPayloadUser;

    if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

    const result = await myDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.studentsData', 'studentsData')
      .where(`user.role = '${Roles.STUDENT}'`)
      .andWhere(`studentsData.status = '${StudentStatus.AVAILABLE}'`)
      .andWhere(`user.isActive = '${UserActive.ACTIVE}'`)
      .getCount();

    if (!result) return res.json({ count: 0 });

    res.json({ count: result });
  } catch (err) {
    next(err);
  }
}
