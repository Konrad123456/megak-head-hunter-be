import {staticText} from "../../../language/en.pl";
import {logoSvg} from "../img/logo";

export abstract class BaseEmailClass {
    protected title: string;

    constructor(title: string) {
        this.title = title;
    }

    protected generateStyles(): string {
        return `
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    justify-items: center;
                    font-family: sans-serif;
                }
                
                .message-container {
                    max-width: 600px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1rem;
                    padding: 5rem;
                    margin: auto;
                    color: white;
                    background: linear-gradient(-120deg, #D62121, #C72C2C, #3A1111);
                }
                
                .message-container__center {
                    align-self: center;
                }
                
                a {
                    display: block;
                    text-align: center;
                    padding: 1rem;
                    background-color: #D76B6B;
                    text-decoration: none;
                    color: white;
                    border-radius: 5px;
                    margin-top: 0.5rem;
                    transition: 0.2s linear;
                }
                
                a:hover {
                    background-color: #562A2A;
                }
                
                ${this.extendsStylesCss()}
            </style>
        `
    }

    protected extendsStylesCss(): string {
        return '';
    }


    protected generateHead(): string {
        return `
            <head>
                <meta charset="UTF-8">
                <title>${this.title}</title>
            </head>
        `
    }

    protected generateMainImg(): string {
        return logoSvg;
    }

    protected genereateGreetingText() {
        return `<p class="greeting">${staticText.notificationsTexts.greetingText}</p>`
    }


    protected generateGoodByText(): string {
        return `
            <div>
                <p>${staticText.notificationsTexts.yourTeam}</p>
                <p>${staticText.notificationsTexts.ourTeamName}</p>
            </div>
        `
    }

    protected generateFooter(): string {
        return '';
    }

    public generateHTMLTemplate(): string {
        return `<!DOCTYPE html>
                <html lang="en">
                ${this.generateHead()}
                ${this.generateStyles()}
                <body>
                    <section class="message-container">
                        <div class="message-container__center">
                            ${this.generateMainImg()}
                        </div>
                        ${this.genereateGreetingText()}
                        ${this.createBody()}
                        ${this.generateGoodByText()}
                        ${this.generateFooter()}
                    </section>
                </body>
                </html>`;
    }

    protected abstract createBody(): string;
}