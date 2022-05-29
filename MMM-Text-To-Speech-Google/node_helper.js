/* Magic Mirror
 * Module: MMM-Text-To-Speech-Google
 */

//'use strict';
const NodeHelper = require('node_helper');
const gTTS = require('gtts');
var player = require('play-sound')(
	opts = {
		player: "mpg123" // use only `mpg123` for playing sounds
	}
);

module.exports = NodeHelper.create({

	speech_start: function (text) {

		let gtts = new gTTS(text, 'es-es');

		gtts.save('/tmp/hello.wav', (err, result) => {
			if (err) { throw new Error(err); }
			console.log('Reproduciendo contenido');
			// right ! sound file is created let's play it !
			this.playing("/tmp/hello.wav");
		});

	},

	// Player del archivo de sonido
	playing: function (file) {
		player.play(file, (err) => {
			if (err) throw new Error(err);
		});
	},


	socketNotificationReceived: function (notification, payload) {
		// Configuration are received
		if (notification === 'SEND_TEXT') {
			console.log("SEND_TEXT: " + payload.text);
			this.config = payload;
			// Set static output to 0, because we do not need any output for MMM
			this.config.output = 0;
			this.speech_start(payload.text);
		}
	},
});
