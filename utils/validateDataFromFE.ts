import * as enums from '../types/index';
import { ValidationError } from './errorsHandler';

type EnumsNameType = 'expectedTypeWorkEntity' | 'ContractType';
type ValueTypes = enums.expectedTypeWorkEntity[] | enums.ContractType[];

export const validateValueFromFE = (val: ValueTypes, enumName: EnumsNameType) => {
  const allPossibilities = Object.keys(enums[enumName]).filter(key => Number(key) >= 0);

  if (!val.length) return [null, allPossibilities];
  
  const validation = (val as []).every((el) => allPossibilities.includes(el));

  const err = validation
    ? null
    : new ValidationError(`Wprowadzone dane: ${val}, nie są częścią dopuszczalnych danych: ['${allPossibilities.join(`','`)}']`, 422);

  return [err, allPossibilities];
}