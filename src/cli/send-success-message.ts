/**
 * Tells the user that the files were successfully written with a configuration specific message.
 *
 * @param doneMessage - The configuration specific message to write to the console.
 */
export function sendSuccessMessage(doneMessage: string): void {
    process.stdout.write(`fsaccone # Files were written successfully. ${doneMessage}\n`)
}
