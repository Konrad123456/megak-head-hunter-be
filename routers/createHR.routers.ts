import { Request, Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { Hr } from '../src/entities/hr/hr.entity';
import { User } from '../src/entities/User/User.entity';
import { Roles } from '../src/entities/types/Roles';
import { validate } from 'class-validator';
import { UserPayloadData, createRegisterToken } from '../utils/createRegisterToken';
import { ValidationError } from '../utils/errorsHandler';
import { staticText } from '../language/en.pl';
import { UserActive } from '../types';
import { createErrorMessage } from '../utils/createErrorMessage';

type RequestBodyHR = Omit<Partial<Hr> & Partial<User>, 'id' | 'password' | 'token' | 'registerToken' | 'role'>;
type RequestAndPayloadUser = Request & UserPayloadData;

const validationErrorOptions = {
  validationError: {
    target: false
  }
}

export const hrRouter = Router()
  .post('/', async (req, res) => {
    const { role } = req.user as RequestAndPayloadUser

    if (role !== Roles.ADMIN) throw new ValidationError(staticText.validation.AccessDenied, 401);

    const { email, fullName, company, maxReservedStudents } = req.body as RequestBodyHR;

    if (!email || !fullName || !company || !maxReservedStudents) throw new ValidationError(staticText.validation.InvalidData, 400);

    const emailLowerCase = email.toLocaleLowerCase();

    const userFound = await myDataSource.getRepository(User).findOneBy({ email: emailLowerCase });

    if (userFound) throw new ValidationError(staticText.validation.UserIsRegistered)

    const user = new User();
    user.email = emailLowerCase;
    user.role = Roles.HR;
    user.isActive = UserActive.NOT_ACTIVE;

    const hr = new Hr();
    hr.fullName = fullName;
    hr.company = company;
    hr.maxReservedStudents = maxReservedStudents;

    const errorsUser = await validate(user, validationErrorOptions);
    const errorsHr = await validate(hr, validationErrorOptions);
    const errors = [...errorsUser, ...errorsHr];

    if (errors.length) {
      const message = createErrorMessage(errors);

      throw new ValidationError(message, 401);
    }

    const result = (await myDataSource.manager.save(hr)) as Hr & { code: string };

    if (result.code === 'ER_DUP_ENTRY') throw new ValidationError(`${staticText.validation.Db.DuplicateEntry} '${email}'`, 500);
    if (result.code && result.code !== 'ER_DUP_ENTRY') throw new ValidationError(staticText.errors.InternalServerError, 500);

    await myDataSource.getRepository(Hr).save(hr);

    user.hr = hr;
    user.id = hr.id;
    user.registerToken = createRegisterToken(user);
    await myDataSource.getRepository(User).save(user);

    // SEND EMAIL EXAMPLE
    // sendEmailToNewUser({
    //   userId: result.user.id,
    // })

    res.send({ message: staticText.validation.message.DataHasBeenSaved })
  });