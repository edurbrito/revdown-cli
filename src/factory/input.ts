import { inquirer, QuestionCreator } from './creator'

class InputQuestion extends QuestionCreator {
    def: string;

    constructor(name: string, message: string, def: string) {
        super("input", name, message)
        this.def = def;
    }

    create_question(callback: object) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message,
            default: this.def
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                throw("Prompt couldn't be rendered in the current environment")
            } else {
                throw("Something else when wrong")
            }
        });
    }
}

export { InputQuestion }