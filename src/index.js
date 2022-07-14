#!/usr/bin/env node

const { Command } = require('commander');
const { INITIALIZE } = require('./utils/initialize');
const { SEND_HELP_MESSAGE } = require('./cli/send-help-message');
const program = new Command();

program
		.argument('[configuration]', 'name of the project configuration to build')
		.action(configuration => {
			if (!configuration) {
				SEND_HELP_MESSAGE();
			} else {
				INITIALIZE(configuration);
			}
		});
program.parse(process.argv);
