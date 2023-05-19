import {Router} from 'express';
import bcrypt from 'bcryptjs';
import {myDataSource} from '../config/database.configuration';
import {User} from '../src/entities/User/User.entity';
import {createTokens} from '../utils/createTokens';
import {userCookieSettings} from '../config/cookie.configuration';
import {ValidationError} from "../utils/errorsHandler";
import {staticText} from "../language/en.pl";
import {Roles} from "../src/entities/types/Roles";
import {StudentsData} from "../src/entities/studentsData/studentsData.entity";
import {Hr} from "../src/entities/hr/hr.entity";

type UserLoginData = {
  email: string;
  password: string;
};

export const loginRouter = Router()
  .post('/', async (req, res) => {
    const { email, password } = req.body as UserLoginData;

    if (!email || !password) throw new ValidationError(staticText.validation.WrongPassword, 401);

    const emailLowerCase = email.toLocaleLowerCase();

    const user = await myDataSource.getRepository(User).findOneOrFail(
        {
            where: {email: emailLowerCase },
            relations: [User.HR_RELATION, User.STUDENTS_DATA_RELATION]
        });

    if (!user) throw new ValidationError(staticText.validation.EmailDoesntExist, 401);
    if (!user.isActive) throw new ValidationError(staticText.validation.UnconfirmedAccount, 401);

    let fullName = '';
    if(user.role === Roles.STUDENT) {
        fullName = user.studentsData.firstName + ' ' + user.studentsData.lastName;
    } else if (user.role === Roles.HR) {
        fullName = user.hr.fullName;
    } else {
        fullName = user.email;
    }

    const access = await bcrypt.compare(password, user.password);

    if (!access) throw new ValidationError(staticText.validation.WrongPassword, 401);

    const { accessToken, refreshToken } = createTokens(user);
    await myDataSource.getRepository(User).update({ id: user.id }, { token: refreshToken });

    res.cookie('refreshToken', refreshToken, userCookieSettings);
    res.json({ accessToken, user: { email: user.email, role: user.role, fullName } });
  });
