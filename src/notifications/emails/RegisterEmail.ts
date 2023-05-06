import {BaseEmailClass} from "./BaseEmailClass";

export class RegisterEmail extends BaseEmailClass {
    private readonly userId: string;
    private readonly registerToken: string;
    private readonly role: string;

    constructor(title: string, userId: string, registerToken: string, role: string) {
        super(title);
        this.userId = userId;
        this.registerToken = registerToken;
        this.role = role;
    }

    private generateRegisterlink() {
        return `${process.env.APP_URL}:${process.env.APP_FE_PORT}/register/${this.userId}/${this.registerToken}`;
    }

    protected createBody() {
        return `
            <p>Miło nam poinformować, że twoje konto zostało dodane z uprawnieniami ${this.role}</p>
            <p>Aby aktywować konto i ustawić hasło prosimy przejść do linku:</p>
            <p><a href="${this.generateRegisterlink()}">Link do rejestracji</a></p>
        `;
    }
}