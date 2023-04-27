import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { Hr } from '../src/entities/hr/hr.entity';
import { User } from '../src/entities/User/User.entity';
import { Roles } from '../src/entities/types/Roles';
import { validate } from 'class-validator';
import { createRegisterToken } from '../utils/createRegisterToken';

type RequestBodyHR = Omit<Partial<Hr> & Partial<User>, 'id' | 'password' | 'token' | 'registerToken' | 'role'>

const validationErrorOptions = {
  validationError: {
    target: false
  }
}

export const createHRRouter = Router()
  .post('/', async (req, res) => {
    const { email, fullName, company, maxReservedStudents } = req.body as RequestBodyHR;

    // TODO: ErrorValidate status 400 + message
    if (!email || !fullName || !company || !maxReservedStudents) throw new Error('Invalid data.');
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

      throw new Error(message);
    }

    const result = await myDataSource.manager.save(hr);
    
    const registerToken = createRegisterToken(user);
    await myDataSource.getRepository(User).update({ id: user.id }, { registerToken });

    // SEND EMAIL EXAMPLE
    // sendEmailToNewUser({
    //   userId: result.user.id,
    // })

    res.send({ message: 'Data has been saved.' })
  });