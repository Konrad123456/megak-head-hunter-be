import {StudentsRatingWithEmail} from "../../src/entities/types/studentsRating";
import {IsEmail, IsNotEmpty, validateSync, ValidationArguments} from "class-validator";
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

    constructor(private userData: StudentsRatingWithEmail) {
        this.email = userData.email;
        this.validate();
    }

    protected validate() {
        const errors = validateSync(this);
        if (errors.length > 0) {
            const chekit = Object.values(errors[0]);
            throw new ValidationError('error', 422);
        }
    }

    private errorsToString(errors: ValidationError[]) {
        // return errors.reduce((prev, curr) => {
        //     // return prev + ', ' + curr[0].constraints.join(', ');
        // }, '')
    }
}