const { COPY_FILES } = require('./copy-files');
const { LOG_UNKNOWN_CONFIG } = require('../cli/log-unknown-config');
const { cwd } = require('process');
const { readdirSync } = require('fs');
const { resolve } = require('path');
const getConfigurations = () => readdirSync(resolve(__dirname, '../../templates'), 'utf-8');

module.exports.INITIALIZE = (configName, doneMessage = '') => {
	const configs = getConfigurations();

	if (!configs.includes(configName)) {
		LOG_UNKNOWN_CONFIG();
		return;
	}

	COPY_FILES(resolve(__dirname, `../../templates/${configName}`), cwd());
	console.info(`\n# Files were written successfully. ${doneMessage}\n`);
};
