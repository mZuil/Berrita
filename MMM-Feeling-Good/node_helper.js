'use strict';
const NodeHelper = require('node_helper');
const fs = require('fs');
const execSync = require('child_process').execSync;
const csvWriter = require('csv-write-stream');
var moment = require('moment');

module.exports = NodeHelper.create({
	start: function () {
		console.log(this.name + " is started!");
	},

	stop: function () {
		//this.connection.close();
	},

	socketNotificationReceived: function (notification, payload) {
		// CASO EN EL QUE ESCRIBO LOS METADATOS EN EL FICHERO
		if (notification === 'WRITE_METADATA') {
			console.log("Notificacion: WRITE_METADATA");
			//Compruebo si los metadatos estan introducidos en su respectiva carpeta de datos
			//Si no lo estan es porque el archivo no existe
			let path = "/home/pi/MagicMirror/modules/MMM-Feeling-Good/data/" + payload.user + "/metadata.txt";
			let dirPath = "/home/pi/MagicMirror/modules/MMM-Feeling-Good/data/" + payload.user;

			try {
				//Si no existe el archivo lo creo y escribo la informacion sobre el usuario
				if (!fs.existsSync(path)) {
					if (!fs.existsSync(dirPath)) {
						fs.mkdirSync(dirPath);
					}

					//Obtengo localizacion con una llamada al sistema
					let location = execSync('host myip.opendns.com resolver1.opendns.com', { encoding: 'utf-8' });
					let indexIp = location.lastIndexOf("address") + 8;
					location = location.substring(indexIp);

					let data = "Usuario: " + payload.user + "\nEdad: " + payload.age + "\nGénero: " + payload.gender + "\nLocalización: " + location;
					fs.writeFile(path, data, (error) => {
						if (error) throw err;
					});
				} else {
					console.log("El usuario " + payload.user + " ya tiene sus metadatos introducidos");
				}
			} catch (err) {
				console.log("Error al introuducir los metadatos: " + err);
			}
		} else if (notification === 'DO_QUESTION') {
			console.log("Notificacion: DO_QUESTION");

			//Obtengo las preguntas que voy a mostrar
			const questions = payload.questionsList;
			//Obtengo el numero de pregunta que habia hecho
			var numberQuestion = payload.numQuestion;
			var numberQuestionList = payload.numQuestionList;
			//Devuelvo la siguiente pregunta, y su numero
			if ((numberQuestion + 1) < questions.length) {
				this.sendSocketNotification("NEW_QUESTION", {
					question: questions[numberQuestion + 1].questionText,
					numQ: numberQuestion + 1,
					numQList: numberQuestionList + 1
				});
			} else {
				//En el caso de que ya no haya mas preguntas por ese dia mando -1
				console.log("NO_QUESTION");
				this.sendSocketNotification("NO_QUESTION");
			}
			//Busco si el csv existe y si no lo agrego con las cabeceras
			let path = "/home/pi/MagicMirror/modules/MMM-Feeling-Good/data/" + payload.user + "/questions-data.csv";

			var writer;
			if (!fs.existsSync(path)) {
				fs.openSync(path, 'a');
				writer = csvWriter({ headers: ["numberQuestion", "question", "answer", "weekNumber", "year"] });
			} else {
				writer = csvWriter({ sendHeaders: false });
			}

			//Correspondencia de letras del teclado
			var answer;
			if (payload.keyPressed === 48) { //Pulsada la tecla 0
				answer = 0;
			} else if (payload.keyPressed === 49) { //Pulsada la tecla 1
				answer = 1;
			} else if (payload.keyPressed === 50) { //Pulsada la tecla 2
				answer = 2;
			} else if (payload.keyPressed === 51) { //Pulsada la tecla 3
				answer = 3;
			}

			//Escribo en el csv la respuesta recibida
			writer.pipe(fs.createWriteStream(path, { flags: 'a' }));
			writer.write({
				numberQuestion: numberQuestionList,
				question: payload.question,
				answer: answer,
				weekNumber: moment().weeks(),
				year: moment().year()
			});
			writer.end();

		}
	},

});
