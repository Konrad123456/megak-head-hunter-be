export abstract class BaseEmailClass {
    protected title: string;

    constructor(title: string) {
        this.title = title;
    }

    protected generateStyles() {
        return `
            <style>
                h1 {
                color: red;
                text-space: 1rem;
            }
            </style>
        `
    }

    protected generateHead() {
        return `
            <head>
                <meta charset="UTF-8">
                <title>${this.title}</title>
            </head>
        `
    }

    protected genereateGreetingText() {
        return `<p>Drogi użytkowniku,</p>`
    }


    protected generateGoodByText() {
        return `
            <p>Twój oddany zespół</p>
            <p>Team 10 MegaK</p>
        `
    }

    public generateHTMLTemplate() {
        return `<!DOCTYPE html>
                <html lang="en">
                ${this.generateHead()}
                ${this.generateStyles()}
                <body>
                    ${this.genereateGreetingText()}
                    ${this.createBody()}
                    ${this.generateGoodByText()}
                </body>
                </html>`;
    }

    abstract createBody(): string;
}