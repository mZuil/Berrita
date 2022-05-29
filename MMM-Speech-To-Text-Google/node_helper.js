/* Magic Mirror
 * Module: MMM-Speech-To-Text-Google
 */

'use strict';
const NodeHelper = require('node_helper');
const stringSimilarity = require("string-similarity");
const { PythonShell } = require('python-shell');
const onExit = require('signal-exit');
var pythonStarted = false;
var isListening = false;

module.exports = NodeHelper.create({
	pyshell: null,
	python_start: function () {
		const self = this;
		const options = {
			mode: 'text',
			args: [
				'--microphone=' + this.config.microphone,
				'--language=' + this.config.language
			],
		};

		// Ejecuto script de speech-to-text
		self.pyshell = new PythonShell(
			'modules/' + this.name + '/tools/speech-to-text.py',
			options
		);

		// check if a message of the python script is comming in
		self.pyshell.on('message', function (message) {
			// Se ha recibido un mensaje
			console.log("Mensaje: " + message);
			if (!self.isListening && stringSimilarity.compareTwoStrings(message.toLowerCase(), self.config.greeting.toLowerCase()) > 0.8) {
				self.isListening = true;
				self.sendSocketNotification('START_LISTENING', message);
			} else if (self.isListening && stringSimilarity.compareTwoStrings(message.toLowerCase(), self.config.farewell.toLowerCase()) > 0.8) {
				self.isListening = true;
				self.sendSocketNotification('STOP_LISTENING', message);
			} else if (self.isListening) {
				self.sendSocketNotification('SPEECH_TEXT', message);
			}
		});

		// Shutdown node helper
		self.pyshell.end(function (err) {
			if (err) throw err;
			console.log('[' + self.name + '] ' + 'finished running...');
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
		if (notification === 'CONFIG') {
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
