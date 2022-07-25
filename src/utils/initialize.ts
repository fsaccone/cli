import { resolve } from 'path'
import { cwd } from 'process'
import { logUnknownConfig } from 'cli/log-unknown-config'
import { sendSuccessMessage } from 'cli/send-success-message'
import { TEMPLATES_PATH } from 'index'
import { copyFiles } from './copy-files'
import { getConfigurations } from './get-configurations'

/**
 * Start the file writing or alerts the user if the given config does not exist.
 *
 * @param configName - The configuration to copy.
 */
export function initialize(configName: string): void {
    const configs = getConfigurations()

    if (!configs.includes(configName)) {
        logUnknownConfig()
        return
    }

    const doneMessage = copyFiles(resolve(TEMPLATES_PATH, configName), cwd())

    sendSuccessMessage(doneMessage)
}
