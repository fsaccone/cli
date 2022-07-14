const { lstatSync, mkdirSync, readFileSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } = require('fs');
const { join } = require('path');
const removeSubdirs = (dir, removeRootDir = false) => {
	const dirFiles = readdirSync(dir);

	for (const dirFile of dirFiles) {
		const dirFileFullPath = join(dir, dirFile);

		if (lstatSync(dirFileFullPath).isDirectory()) {
			removeSubdirs(dirFileFullPath, true);
		} else {
			unlinkSync(dirFileFullPath);
		}
	}

	if (removeRootDir) {
		rmdirSync(dir);
	}
};
const COPY_FILES = (fullDirToRead, fullDirToWrite) => {
	let doneMessage = '';

	removeSubdirs(fullDirToWrite);

	const filesToRead = readdirSync(fullDirToRead);

	for (const fileToRead of filesToRead) {
		const fileToReadFullPath = join(fullDirToRead, fileToRead);
		let fileToWrite = fileToRead;

		if (fileToRead === '.gitignore') {
			fileToWrite = '.gitignore';
		} else if (fileToRead === 'donemessage.txt') {
			doneMessage = readFileSync(fileToReadFullPath, 'utf-8').trim();
			continue;
		}

		const fileToWriteFullPath = join(fullDirToWrite, fileToWrite);

		if (lstatSync(fileToReadFullPath).isDirectory()) {
			mkdirSync(fileToWriteFullPath);
			COPY_FILES(fileToReadFullPath, fileToWriteFullPath);
			continue;
		}

		const fileToReadData = readFileSync(fileToReadFullPath, 'utf-8');

		writeFileSync(fileToWriteFullPath, fileToReadData, 'utf-8');
	}

	return doneMessage;
};

exports.COPY_FILES = COPY_FILES;
