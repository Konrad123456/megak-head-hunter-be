import { NextFunction, Request, Response } from "express";
import { Roles } from "../../src/entities/types/Roles";
import { ValidationError } from "../../utils/errorsHandler";
import { StudentsList, StudentsListResponse } from "../../types/user.types";
import { StudentsRating } from "../../src/entities/studentsRating/studentsRating.entity";
import { myDataSource } from "../../config/database.configuration";
import { StudentStatus } from "../../src/entities/types/studentsData";
import { UserPayloadData } from "../../utils/createTokens";

// type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentsList = async (req: Request | any, res: Response, next: NextFunction) => {
  const { id, role } = req.user;

  if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

  const page = Number(req.params.page);
  const limit = Number(req.params.limit);

  const sqlSelect = [
    'user.email',
    'studentsRating.id',
    'studentsRating.courseCompletion',
    'studentsRating.courseEngagment',
    'studentsRating.projectDegree',
    'studentsRating.teamProjectDegree',
    'studentsRating.bonusProjectUrls',
    'studentsData.tel',
    'studentsData.firstName',
    'studentsData.lastName',
    'studentsData.githubUsername',
    'studentsData.portfolioUrls',
    'studentsData.projectUrls',
    'studentsData.bio',
    'studentsData.expectedTypeWork',
    'studentsData.targetWorkCity',
    'studentsData.expectedContractType',
    'studentsData.expectedSalary',
    'studentsData.canTakeApprenticeship',
    'studentsData.monthsOfCommercialExp',
    'studentsData.education',
    'studentsData.workExperience',
    'studentsData.courses',
  ];

  const results = await myDataSource
    .getRepository(StudentsRating)
    .createQueryBuilder('studentsRating')
    .leftJoinAndSelect('studentsRating.user', 'user')
    .leftJoinAndSelect('studentsRating.studentsData', 'studentsData')
    .where(`user.role = '${Roles.STUDENT}'`)
    .andWhere(`studentsData.status = '${StudentStatus.AVAILABLE}'`)
    .orderBy('studentsData.lastName, studentsData.firstName')
    .select(sqlSelect)
    .limit(limit)
    .offset(page)
    .getMany();

  const list: StudentsListResponse = results.map((r) => {
    const user = r.user;
    const studentsData = r.studentsData;

    delete r.user;
    delete r.studentsData;

    const data = {
      ...r,
      ...user,
      ...studentsData,
    } as StudentsList

    return data;
  })

  res.json(list);
}
