const { lstatSync, mkdirSync, readFileSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } = require('fs');
const { join } = require('path');
const removeSubdirs = (dir, removeRootDir = false) => {
	const dirFiles = readdirSync(dir);

	for (let iDirFile = 0; iDirFile < dirFiles.length; iDirFile++) {
		const dirFile = dirFiles[iDirFile];
		const dirFileFullPath = join(dir, dirFile);

		if (
			lstatSync(dirFileFullPath)
					.isDirectory()
		) {
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

	iterateThroughFilesToRead:
	for (let iFileToRead = 0; iFileToRead < filesToRead.length; iFileToRead++) {
		const fileToRead = filesToRead[iFileToRead];
		const fileToReadFullPath = join(fullDirToRead, fileToRead);
		let fileToWrite = fileToRead;

		switch (fileToRead) {
			case 'gitignore.txt':
				fileToWrite = '.gitignore';
				break;
			case 'donemessage.txt':
				doneMessage = readFileSync(fileToReadFullPath, 'utf-8').trim();
				continue iterateThroughFilesToRead;
			default:
		}

		const fileToWriteFullPath = join(fullDirToWrite, fileToWrite);

		if (
			lstatSync(fileToReadFullPath)
					.isDirectory()
		) {
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
