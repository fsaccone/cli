const { readdirSync } = require('fs');
const { resolve } = require('path');
const getConfigurations = () => readdirSync(resolve(__dirname, '../../templates'), 'utf-8');
const getRandomConfiguration = () => {
	const configs = getConfigurations();

	return configs[Math.floor(Math.random() * configs.length)];
};

exports.SEND_HELP_MESSAGE = () => {
	console.info(`
# To build a project, run "fsaccone-cli <CONFIGURATION>"

Configurations:
    - ${getConfigurations().join('\n    - ')}

    Example:
        fsaccone-cli ${getRandomConfiguration()}`);
};

