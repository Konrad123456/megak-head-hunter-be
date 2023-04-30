import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { StudentsRating } from "../../src/entities/studentsRating/studentsRating.entity";
import { myDataSource } from "../../config/database.configuration";
import { StudentStatus } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";
import { DestructuringToStudentsCV } from "../../utils/destructuringToStudentsCV";

type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user as RequestAndPayloadUser;

    if (role !== Roles.HR && role !== Roles.STUDENT) throw new ValidationError('Access denied.', 401);

    const userId = req.params.id;

    const results = await myDataSource
      .getRepository(StudentsRating)
      .createQueryBuilder('studentsRating')
      .leftJoinAndSelect('studentsRating.user', 'user')
      .leftJoinAndSelect('studentsRating.studentsData', 'studentsData')
      .where(`user.role = '${Roles.STUDENT}'`)
      .andWhere(`studentsData.status = '${StudentStatus.AVAILABLE}'`)
      .andWhere('studentsRating.id = :userId', { userId })
      .orderBy('studentsData.lastName, studentsData.firstName')
      .getOne();

    if (!results) return res.json([]);

    const data = {
      ...results,
      ...results.user,
      ...results.studentsData,
    }

    const userCV = new DestructuringToStudentsCV(data).returnData();

    res.json(userCV);
  } catch (err) {
    next(err);
  }
}
