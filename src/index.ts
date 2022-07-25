import { resolve } from 'path'
import { sendHelpMessage } from 'cli/send-help-message'
import { Command } from 'commander'
import { initialize } from 'utils/initialize'

const program = new Command()
const TEMPLATES_PATH = resolve(__dirname, '../templates')

program
    .argument('[configuration]', 'name of the project configuration to build')
    .action((configuration: string) => {
        if (!configuration) {
            sendHelpMessage()
        } else {
            initialize(configuration)
        }
    })
program.parse(process.argv)

export { TEMPLATES_PATH }
