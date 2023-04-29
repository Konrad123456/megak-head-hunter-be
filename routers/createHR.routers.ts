import { Request, Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { Hr } from '../src/entities/hr/hr.entity';
import { User } from '../src/entities/User/User.entity';
import { Roles } from '../src/entities/types/Roles';
import { validate } from 'class-validator';
import { UserPayloadData, createRegisterToken } from '../utils/createRegisterToken';
import { ValidationError } from '../utils/errorsHandler';

type RequestBodyHR = Omit<Partial<Hr> & Partial<User>, 'id' | 'password' | 'token' | 'registerToken' | 'role'>;
type RequestAndPayloadUser = Request & UserPayloadData;

const validationErrorOptions = {
  validationError: {
    target: false
  }
}

export const hrRouter = Router()
  .post('/', async (req, res) => {
    const { id, role } = req.user as RequestAndPayloadUser

    if (role !== Roles.ADMIN) throw new ValidationError('Access denied.', 401);

    const { email, fullName, company, maxReservedStudents } = req.body as RequestBodyHR;

    if (!email || !fullName || !company || !maxReservedStudents) throw new ValidationError('Invalid data.', 400);
    
    const emailLowerCase = email.toLocaleLowerCase();
    const user = new User();
    const hr = new Hr();
    hr.user = user;

    user.email = emailLowerCase;
    user.role = Roles.HR;

    hr.fullName = fullName;
    hr.company = company;
    hr.maxReservedStudents = maxReservedStudents;

    const errorsUser = await validate(user, validationErrorOptions);
    const errorsHr = await validate(hr, validationErrorOptions);

    const errors = [...errorsUser, ...errorsHr];

    if (errors.length) {
      const message = errors.map(err => {
        if (!err.constraints) return;

        const [, val] = Object.entries(err.constraints)[0];

        return val;
      }).join('; ')

      throw new ValidationError(message, );
    }

    const result = (await myDataSource.manager.save(hr)) as Hr & {code: string};

    if (result?.code === 'ER_DUP_ENTRY') throw new ValidationError(`Duplicate entry '${email}'`, 500);
    if (result?.code !== 'ER_DUP_ENTRY') throw new ValidationError('Internal Server Error', 500);


    const registerToken = createRegisterToken(user);
    await myDataSource.getRepository(User).update({ id: user.id }, { registerToken });

    // SEND EMAIL EXAMPLE
    // sendEmailToNewUser({
    //   userId: result.user.id,
    // })

    res.send({ message: 'Data has been saved.' })
  });