import {StudentsRatingWithEmail} from "../../entities/types/studentsRating";
import {User} from "../../entities/User/User.entity";
import {myDataSource} from "../../../config/database.configuration";
import { StudentsRating } from "../../entities/studentsRating/studentsRating.entity";
import {Roles} from "../../entities/types/Roles";
import {randomUUID} from "crypto";
import {createRegisterToken} from "../../../utils/createRegisterToken";

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

            user.studentsRating = userRating;

            await myDataSource.getRepository(User).save(user);
        }

        return true;
    }

    private checkUserExist = async ({ email }: StudentsRatingWithEmail) => {
        return await myDataSource.getRepository(User).findOneBy({ email });
    }
}