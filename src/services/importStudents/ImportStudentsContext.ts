import {StudentsRatingWithEmail} from "../../entities/types/studentsRating";
import {User} from "../../entities/User/User.entity";
import {myDataSource} from "../../../config/database.configuration";
import { StudentsRating } from "../../entities/studentsRating/studentsRating.entity";
import {Roles} from "../../entities/types/Roles";
import {randomUUID} from "crypto";
import {createRegisterToken} from "../../../utils/createRegisterToken";
import {RegisterEmail} from "../../notifications/emails/RegisterEmail";
import {staticText} from "../../../language/en.pl";
import {Mailer} from "../../notifications/mailer/Mailer";
import { StudentsData } from "../../entities/studentsData/studentsData.entity";

export class ImportStudentsToDB {

    public importToDb = async (studentsRating: StudentsRatingWithEmail[]): Promise<boolean> => {
        for ( const studentData of studentsRating ) {
            if(await this.checkUserExist(studentData)) continue;
            const user = new User();
            user.id = randomUUID();
            user.email = studentData.email;
            user.password = randomUUID();
            user.role = Roles.STUDENT;
            user.registerToken = createRegisterToken(user);

            const userRating = new StudentsRating();
            userRating.courseCompletion = studentData.courseCompletion;
            userRating.courseEngagment = studentData.courseEngagment;
            userRating.projectDegree = studentData.projectDegree;
            userRating.teamProjectDegree = studentData.teamProjectDegree;
            userRating.bonusProjectUrls = studentData.bonusProjectUrls;

            await myDataSource.getRepository(StudentsRating).save(userRating);
            
            const sd = new StudentsData();
            await myDataSource.getRepository(StudentsData).save(sd);

            user.studentsRating = userRating;
            user.studentsData = sd;

            await myDataSource.getRepository(User).save(user);

            const mailer = new Mailer(
                new RegisterEmail(
                staticText.emails.titles.registerAccount,
                user.id,
                user.registerToken,
                staticText.rolesName.student
            ),
                user.email,
                staticText.emails.titles.registerAccount
            );

            mailer.sendEmail();
        }

        return true;
    }

    private checkUserExist = async ({ email }: StudentsRatingWithEmail) => {
        return await myDataSource.getRepository(User).findOneBy({ email });
    }
}