import { lstatSync, mkdirSync, readFileSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'

function removeSubdirs(dir: string, removeRootDir = false): void {
	const dirFiles = readdirSync(dir)

	for (const dirFile of dirFiles) {
		const dirFileFullPath = join(dir, dirFile)

		if (lstatSync(dirFileFullPath).isDirectory()) {
			removeSubdirs(dirFileFullPath, true)
		} else {
			unlinkSync(dirFileFullPath)
		}
	}

	if (removeRootDir) {
		rmdirSync(dir)
	}
}

/**
 * Recursively copies all the files in a directory to another.
 *
 * @param fullDirToRead  - The source directory.
 * @param fullDirToWrite - The directory where the files will be written.
 */
export function copyFiles(fullDirToRead: string, fullDirToWrite: string): string {
	let doneMessage = ''

	removeSubdirs(fullDirToWrite)

	const filesToRead = readdirSync(fullDirToRead)

	for (const fileToRead of filesToRead) {
		const fileToReadFullPath = join(fullDirToRead, fileToRead)
		let fileToWrite = fileToRead

		if (fileToRead === 'gitignore.txt') {
			fileToWrite = '.gitignore'
		} else if (fileToRead === 'donemessage.txt') {
			doneMessage = readFileSync(fileToReadFullPath, 'utf-8').trim()
			continue
		}

		const fileToWriteFullPath = join(fullDirToWrite, fileToWrite)

		if (lstatSync(fileToReadFullPath).isDirectory()) {
			mkdirSync(fileToWriteFullPath)
			copyFiles(fileToReadFullPath, fileToWriteFullPath)
			continue
		}

		const fileToReadData = readFileSync(fileToReadFullPath, 'utf-8')

		writeFileSync(fileToWriteFullPath, fileToReadData, 'utf-8')
	}

	return doneMessage
}
