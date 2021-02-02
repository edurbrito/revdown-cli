import * as inquirer from "inquirer"

class QuestionCreator {
    message: string;
    name: string;
    type: string;

    create_question(callback) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }
}

class OneChoiceQuestion implements QuestionCreator {
    message: string;
    name: string;
    type: string;
    choices: Array<any>;

    constructor(name: string, message: string, choices: Array<any>) {
        this.type = "list";
        this.name = name;
        this.message = message;
        this.choices = choices;
    }

    create_question(callback) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message,
            choices: this.choices
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }
}

class MultipleChoiceQuestion implements QuestionCreator {
    message: string;
    name: string;
    type: string;
    choices: Array<any>;

    constructor(name: string, message: string, choices: Array<any>) {
        this.type = "checkbox";
        this.name = name;
        this.message = message;
        this.choices = choices;
    }

    create_question(callback) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message,
            choices: this.choices
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }
}

class ConfirmQuestion extends QuestionCreator {
    message: string;
    name: string;
    type: string;

    constructor(name: string, message: string) {
        super()
        this.type = "confirm";
        this.name = name;
        this.message = message;
    }
}

class InputQuestion extends QuestionCreator {
    message: string;
    name: string;
    type: string;
    def: string;

    constructor(name: string, message: string, def: string) {
        super()
        this.type = "input";
        this.name = name;
        this.message = message;
        this.def = def;
    }

    create_question(callback) {
        inquirer.prompt([{
            type: this.type,
            name: this.name,
            message: this.message,
            default: this.def
        }]).then(callback).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }
}

class MultipleInputQuestions extends QuestionCreator {
    prompt: Array<object>

    constructor(prompt) {
        super()
        this.prompt = prompt
    }

    create_question(callback) {
        inquirer.prompt(this.prompt).then(callback).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }
}

export { OneChoiceQuestion, MultipleChoiceQuestion, ConfirmQuestion, InputQuestion, MultipleInputQuestions };