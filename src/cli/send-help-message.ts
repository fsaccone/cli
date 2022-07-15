import { getConfigurations } from 'utils/get-configurations'

function getRandomElementFromArray<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)] as T
}

function getRandomConfiguration(): string {
	const configs = getConfigurations()

	return getRandomElementFromArray(configs)
}

/**
 * Tells the user how to correctly utilize the CLI.
 */
export function sendHelpMessage(): void {
	process.stdout.write(`fsaccone-cli # To build a project, run "fsaccone-cli <CONFIGURATION>"

Configurations:
    - ${getConfigurations().join('\n    - ')}

    Example:
        fsaccone-cli ${getRandomConfiguration()}\n`)
}

