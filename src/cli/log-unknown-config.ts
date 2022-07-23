/**
 * Tells the user that the given configuration does not exist.
 */
export function logUnknownConfig(): void {
	process.stdout.write('fsaccone # Unknown configuration.\n')
}
