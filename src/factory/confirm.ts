import { inquirer, QuestionCreator } from './creator'

class ConfirmQuestion extends QuestionCreator {
    constructor(name: string, message: string) {
        super("confirm", name, message)
    }
}

export { ConfirmQuestion }