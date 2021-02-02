import { inquirer, QuestionCreator } from './creator'

class MultipleInputQuestions extends QuestionCreator {
    prompt: Array<object>

    constructor(prompt) {
        super("list", "dummy", "dummy")
        this.prompt = prompt
    }

    create_question(callback: object) {
        inquirer.prompt(this.prompt).then(callback).catch(error => {
            if (error.isTtyError) {
                throw("Prompt couldn't be rendered in the current environment")
            } else {
                throw("Something else when wrong")
            }
        });
    }
}

export { MultipleInputQuestions }