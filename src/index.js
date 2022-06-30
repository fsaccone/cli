#!/usr/bin/env node

const { Command } = require('commander');
const { INITIALIZE } = require('./utils/initialize');
const { SEND_HELP_MESSAGE } = require('./cli/send-help-message');
const program = new Command();
const doneMessages = {
	basic: '',
	frontend: 'Run "npm run config" to finish the configuration.',
	node: 'Run "npm run config" to finish the configuration.'
};

program
		.argument('[configuration]', 'name of the project configuration to build')
		.action(configuration => {
			if (!configuration) {
				SEND_HELP_MESSAGE();
			} else {
				INITIALIZE(configuration, doneMessages[configuration] ?? '');
			}
		});
program.parse(process.argv);
