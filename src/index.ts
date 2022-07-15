import { Command } from 'commander'
import { initialize } from 'utils/initialize'
import { resolve } from 'path'
import { sendHelpMessage } from 'cli/send-help-message'

export const TEMPLATES_PATH = resolve(__dirname, '../templates')

const program = new Command()

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
