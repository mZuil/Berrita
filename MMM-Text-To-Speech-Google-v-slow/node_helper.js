/* Magic Mirror
 * Module: MMM-Text-To-Speech-Google
 */

'use strict';
const NodeHelper = require('node_helper');
const { PythonShell } = require('python-shell');
const onExit = require('signal-exit');
var pythonStarted = false;
var text = "";

module.exports = NodeHelper.create({
	pyshell: null,
	python_start: function () {
		const self = this;
		console.log(this.config.text);
		const options = {
			mode: 'text',
			args: [
				'--language=' + this.config.language,
				'--text=' + this.config.text
			],
		};

		// Ejecuto script de speech-to-text
		self.pyshell = new PythonShell(
			'modules/' + this.name + '/tools/text-to-speech.py',
			options
		);

		// Shutdown node helper
		self.pyshell.end(function (err) {
			if (err) throw err;
			console.log('[' + self.name + '] ' + 'dejando de ejecutarse...');
		});

		onExit(function (code, signal) {
			self.destroy();
		});
	},

	python_stop: function () {
		this.destroy();
	},

	destroy: function () {
		console.log('[' + this.name + '] ' + 'Terminate python');
		this.pyshell.childProcess.kill();
	},

	socketNotificationReceived: function (notification, payload) {
		// Configuration are received
		if (notification === 'SEND_TEXT') {
			this.config = payload;
			// Set static output to 0, because we do not need any output for MMM
			this.config.output = 0;
			if (!pythonStarted) {
				pythonStarted = true;
				this.python_start();
			}
		}
	},

	stop: function () {
		pythonStarted = false;
		this.python_stop();
	},
});
