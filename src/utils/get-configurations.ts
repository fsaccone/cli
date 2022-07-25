import { readdirSync } from 'fs'
import { resolve } from 'path'
import { TEMPLATES_PATH } from 'index'

/**
 * Gets the array of all the configuration names.
 */
export function getConfigurations(): string[] {
    return readdirSync(TEMPLATES_PATH, 'utf-8')
}
