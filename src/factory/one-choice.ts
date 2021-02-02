import { inquirer, QuestionCreator } from './creator'

class OneChoiceQuestion extends QuestionCreator {
    choices: Array<any>;

    constructor(name: string, message: string, choices: Array<any>) {
        super("list",name, message)
        this.choices = choices;
    }

    create_question(callback: object) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message,
            choices: this.choices
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                throw("Prompt couldn't be rendered in the current environment")
            } else {
                throw("Something else when wrong")
            }
        });
    }
}

export { OneChoiceQuestion }