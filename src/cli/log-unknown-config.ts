/**
 * Tells the user that the given configuration does not exist.
 */
export function logUnknownConfig(): void {
	process.stdout.write('fsaccone-cli # Unknown configuration.\n')
}
