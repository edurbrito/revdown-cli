import * as inquirer from "inquirer"

class QuestionCreator {
    type: string;
    name: string;
    message: string;

    constructor(type: string, name: string, message: string){
        this.type = type
        this.name = name
        this.message = message
    }

    create_question(callback: object) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                throw("Prompt couldn't be rendered in the current environment")
            } else {
                throw("Something else when wrong")
            }
        });
    }
}

export { inquirer, QuestionCreator }