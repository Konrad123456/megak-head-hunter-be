import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { myDataSource } from "../../config/database.configuration";
import { StudentStatus } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";
import { ExtractDataGetOne } from "../../utils/extractDataGetOne";
import { User } from "../../src/entities/User/User.entity";
import { UserActive } from "../../types";

type RequestAndPayloadUser = Request & UserPayloadData;

export const getOneStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user as RequestAndPayloadUser;

    if (role !== Roles.HR && role !== Roles.STUDENT) throw new ValidationError('Access denied.', 401);

    const results = await myDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.studentsRating', 'studentsRating')
    .leftJoinAndSelect('user.studentsData', 'studentsData')
    .where('user.id = :userId', { userId: id })
    .andWhere(`user.isActive = '${UserActive.ACTIVE}'`)
    .andWhere(`user.role = '${Roles.STUDENT}'`)
    .getOne()

    if (!results) return res.json([]);

    const data = {
      ...results.studentsRating,
      ...results.studentsData,
      ...results,
    }

    const userCV = new ExtractDataGetOne(data).returnData();

    res.json(userCV);
  } catch (err) {
    next(err);
  }
}
