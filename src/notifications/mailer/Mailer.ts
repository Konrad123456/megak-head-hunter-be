import {BaseEmailClass} from "../emails/BaseEmailClass";
import {mailer} from "../../../config/mail.configuration";
import {logger} from "../../../config/logger.configuration";
import {staticText} from "../../../language/en.pl";

export class Mailer {
    private readonly ourCompanyEmail: string;
    private readonly template: BaseEmailClass;
    private readonly sendTo: string;
    private readonly subject: string;

    constructor(template: BaseEmailClass, to: string, subject: string) {
        this.template = template;
        this.ourCompanyEmail = process.env.MAIL_NORESPONSE || 'noreplay@team10.pl';
        this.sendTo = to;
        this.subject = subject;
    }

    public sendEmail = async () => {
        try {
            await mailer.sendMail({
                from: this.ourCompanyEmail,
                to: this.sendTo,
                subject: this.subject,
                html: this.template.generateHTMLTemplate(),
            })
        } catch (e) {
            logger.error(staticText.errors.SendEmailError + this.sendTo);
        }
    }
}