import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
// const DEFAULT_LANGUAGE = 'en'
// const DEFAULT_LANGUAGE = 'es'
// const DEFAULT_LANGUAGE = 'rus'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
    try {
        const answer = await terminalController.question()
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('process finished!')
            return;
        }
        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
        await save(person)

        return mainLoop()
    } catch (err) {
        console.error('DEU RUIM**', err)
        return mainLoop()
    }
}

await mainLoop()