import {StudentsRatingWithEmail} from "../../src/entities/types/studentsRating";
import {IsEmail, IsNotEmpty, Max, Min, validateSync, ValidationArguments} from "class-validator";
import {ValidationError} from "../errorsHandler";
import {staticText} from "../../language/en.pl";

export class ImportFileValidator {
    @IsNotEmpty()
    @IsEmail({}, {
        message: (args: ValidationArguments) => {
            return staticText.validation.InvalidEmail + ' ' + args.value;
        }
    })
    private email: string;

    @Min(1)
    @Max(5)
    private courseCompletion: number

    @Min(1)
    @Max(5)
    private courseEngagment: number;

    @Min(1)
    @Max(5)
    private projectDegree: number;

    @Min(1)
    @Max(5)
    private teamProjectDegree: number;

    @IsNotEmpty()
    private bonusProjectUrls: string[];

    constructor(private userData: StudentsRatingWithEmail) {
        this.email = userData.email;
        this.courseCompletion = Number(userData.courseCompletion);
        this.courseEngagment = Number(userData.courseEngagment);
        this.projectDegree = Number(userData.projectDegree);
        this.teamProjectDegree = Number(userData.teamProjectDegree);
        this.bonusProjectUrls = userData.bonusProjectUrls;
        this.validate();
    }

    protected validate() {
        const errors = validateSync(this);
        if (errors.length > 0 && errors[0].constraints) {
            throw new ValidationError(this.errorsToString(errors[0].constraints), 422);
        }
    }

    private errorsToString(errors: {[p: string]: string}): string {
        let errorsMessage = '';
        for (const error in errors) {
            errorsMessage += `${errors[error]}, `;
        }
        return errorsMessage;
    }
}