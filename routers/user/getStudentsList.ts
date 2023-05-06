import { NextFunction, Request, Response } from 'express';
import { Roles } from '../../src/entities/types/Roles';
import { ValidationError } from '../../utils/errorsHandler';
import { FiltersData, StudentsListResponse, UserActive } from '../../types/user.types';
import { myDataSource } from '../../config/database.configuration';
import { StudentStatus } from '../../src/entities/types/studentsData';
import { UserPayloadData } from '../../utils/createTokens';
import { ExtractDataToStudentsList } from '../../utils/extractDataToStudentsList';
import { User } from '../../src/entities/User/User.entity';

type RequestAndPayloadUser = Request & UserPayloadData;

export const getStudentsList = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const { role } = req.user as RequestAndPayloadUser
    const {
      courseCompletion,
      courseEngagment,
      projectDegree,
      teamProjectDegree,
      expectedTypeWork,
      expectedContractType,
      expectedSalary, //tablica 
      canTakeApprenticeship,
      monthsOfCommercialExp,
    } = req.body as FiltersData;

    // console.log(expectedTypeWork);

    if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

    const limit = Number(req.params.limit);
    const page = (Number(req.params.page) - 1) * limit;

    const results = await myDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.studentsRating', 'sr')
      .leftJoinAndSelect('user.studentsData', 'sd')
      .where(`user.role = '${Roles.STUDENT}'`)
      .andWhere(`user.isActive = '${UserActive.ACTIVE}'`)
      .andWhere(`sd.status = '${StudentStatus.AVAILABLE}'`)
      .andWhere('sr.courseCompletion >= :courseCompletion', { courseCompletion: courseCompletion || '1' })
      .andWhere('sr.courseEngagment >= :courseEngagment', { courseEngagment: courseEngagment || '1' })
      .andWhere('sr.projectDegree >= :projectDegree', { projectDegree: projectDegree || '1' })
      .andWhere('sr.teamProjectDegree >= :teamProjectDegree', { teamProjectDegree: teamProjectDegree || '1' })
      .andWhere("sd.expectedTypeWork IN (:...expectedTypeWork)", { expectedTypeWork: expectedTypeWork || ['0', '1', '2', '3', '4'] })
      .andWhere("sd.expectedContractType IN (:...expectedContractType)", { expectedContractType: expectedContractType || ['0', '1', '2', '3'] })
      .andWhere("sd.expectedSalary BETWEEN :expectedSalaryFrom AND :expectedSalaryTo", { expectedSalaryFrom: 2000, expectedSalaryTo: 10000 })
      .andWhere('sd.canTakeApprenticeship = :canTakeApprenticeship', { canTakeApprenticeship: canTakeApprenticeship || '0' })
      .andWhere('sd.monthsOfCommercialExp >= :monthsOfCommercialExp', { monthsOfCommercialExp: monthsOfCommercialExp || '0' })
      .orderBy('sd.lastName, sd.firstName')
      .limit(limit)
      .offset(page)
      .getMany();

    if (!results) return res.json([]);

    const list: StudentsListResponse = results.map((r) => {
      const data = {
        ...r,
        ...r.studentsData,
        ...r.studentsRating,
      }

      const result = new ExtractDataToStudentsList(data).returnData();

      return result;
    })

    res.json(list);
  } catch (err) {
    next(err)
  }
}
