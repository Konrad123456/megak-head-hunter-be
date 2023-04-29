import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { StudentsListResponse } from "../../types/user.types";
import { StudentsRating } from "../../src/entities/studentsRating/studentsRating.entity";
import { myDataSource } from "../../config/database.configuration";
import { StudentStatus } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";
import { DestructuringToStudentsList } from "../../utils/destructuringToStudentsList";

type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentsList = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user as RequestAndPayloadUser

  if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

  const page = Number(req.params.page);
  const limit = Number(req.params.limit);

  const results = await myDataSource
    .getRepository(StudentsRating)
    .createQueryBuilder('studentsRating')
    .leftJoinAndSelect('studentsRating.user', 'user')
    .leftJoinAndSelect('studentsRating.studentsData', 'studentsData')
    .where(`user.role = '${Roles.STUDENT}'`)
    .andWhere(`studentsData.status = '${StudentStatus.AVAILABLE}'`)
    .orderBy('studentsData.lastName, studentsData.firstName')
    .limit(limit)
    .offset(page)
    .getMany();

  if (!results) return res.json([]);

  const list: StudentsListResponse = results.map((r) => {
    const data = {
      ...r,
      ...r.user,
      ...r.studentsData,
    }

    const result = new DestructuringToStudentsList(data).returnData();

    return result;
  })

  res.json(list);
}
