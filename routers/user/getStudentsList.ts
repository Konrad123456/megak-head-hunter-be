import { NextFunction, Request, Response } from 'express';
import { Roles } from '../../src/entities/types/Roles';
import { ValidationError } from '../../utils/errorsHandler';
import { FiltersData, StudentsListResponse, UserActive } from '../../types/user.types';
import { myDataSource } from '../../config/database.configuration';
import { StudentStatus } from '../../src/entities/types/studentsData';
import { UserPayloadData } from '../../utils/createTokens';
import { ExtractDataToStudentsList } from '../../utils/extractDataToStudentsList';
import { User } from '../../src/entities/User/User.entity';
import { validateValueFromFE } from '../../utils/validateDataFromFE';
import { staticText } from '../../language/en.pl';

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
      expectedSalary,
      canTakeApprenticeship,
      monthsOfCommercialExp,
    } = req.body as FiltersData;

    if (role !== Roles.HR) throw new ValidationError('Access denied.', 401);

    const [errTypeWork, allExpectedTypeWork] = validateValueFromFE(expectedTypeWork, 'expectedTypeWorkEntity');
    if (errTypeWork) next(errTypeWork);

    const [errContractType, allExpectedContractType] = validateValueFromFE(expectedContractType, 'ContractType');
    if (errContractType) next(errContractType);

    if (expectedSalary[0] > expectedSalary[1]) throw new ValidationError(staticText.validation.DoValueIsWrong, 422);

    if (expectedSalary[0] < 0 || expectedSalary[1] < 0) throw new ValidationError(staticText.validation.ValuesGreaterThanZero, 422);

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
      .andWhere("sd.expectedTypeWork IN (:...expectedTypeWork)", {
        expectedTypeWork: (expectedTypeWork.length) ? expectedTypeWork : allExpectedTypeWork
      })
      .andWhere("sd.expectedContractType IN (:...expectedContractType)", {
        expectedContractType: (expectedContractType.length) ? expectedContractType : allExpectedContractType
      })
      .andWhere("sd.expectedSalary BETWEEN :expectedSalaryFrom AND :expectedSalaryTo", {
        expectedSalaryFrom: expectedSalary[0] || 0, expectedSalaryTo: expectedSalary[1] || 999999
      })
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
