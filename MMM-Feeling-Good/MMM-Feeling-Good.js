Module.register("MMM-Feeling-Good", {

	questions: [],
	status: 2, //0 -> preguntas | 1 -> fin de las preguntas | 2 -> acaba de empezar | 3 -> Pregunta inicial 
	keyPressed: 0, // ninguna tecla presionada

	//Aqui se pueden meter variables que vendrian por defecto
	defaults: {
		user: "undefined",
		genders: [],
		ages: [],
		language: "es",
		question: "",
		numQuestion: 0,
		numQuestionList: 0,
	},


	// ----------------------------------------------------------------------------------------------------
	//Esta funcion se ejecuta cuando el modulo se carga con exito
	start: function () {
		moment.locale(this.config.language);
		var self = this;

		//Cuando se pulse una tecla de las que sirven para calificar, cambio la pregunta
		document.addEventListener('keypress', function (e) {

			if (e.keyCode == 48 || e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51) {
				self.keyPressed = e.keyCode;
				self.updateDom();
				self.sendSocketNotification('DO_QUESTION', {
					question: self.config.question,
					questionsList: self.questions,
					numQuestion: self.config.numQuestion, // de 0 a 4 o 3 depende del dia
					numQuestionList: self.config.numQuestionList, //de 1 a 25
					keyPressed: e.keyCode,
					user: self.config.user
				});
			}
		});
	},

	// ----------------------------------------------------------------------------------------------------
	getScripts: function () {
		return ["moment.js"];
	},

	// ----------------------------------------------------------------------------------------------------
	getTranslations: function () {
		//Para acceder a un literal: this.translate('nombre_literal')
		return {
			es: 'translations/es.json',
		};
	},

	// ----------------------------------------------------------------------------------------------------
	getStyles: function () {
		return ["MMM-Feeling-Good.css"];
	},

	// ----------------------------------------------------------------------------------------------------
	//Funcion que imprime por pantalla el contenido en la pantalla
	getDom: function () {
		//Una vez tengo las preguntas de ese dia, las muestro por pantalla una a una
		const wrapper = document.createElement("div");
		if (this.status == 0 || this.status == 3) {

			if (this.status == 0) {
				wrapper.appendChild(document.createTextNode(this.translate('last_week')));
				wrapper.appendChild(document.createElement("br"));
			}
			wrapper.className = "thin xlarge bright pre-line";

			//Agrego la pregunta
			const spanElement = document.createElement("span");
			let headerQuestion = document.createElement("p");
			headerQuestion.className = "headerQuestion";
			headerQuestion.appendChild(document.createTextNode(this.config.question));
			spanElement.appendChild(headerQuestion);

			// Creo un elemento de texto para cada calificacion
			const questionsDiv = document.createElement("div");
			questionsDiv.classList.add("respuestas");

			let ans0 = document.createElement("p");
			ans0.appendChild(document.createTextNode(this.translate('answer0') + " (0)  "));
			let ans1 = document.createElement("p");
			ans1.appendChild(document.createTextNode(this.translate('answer1') + " (1)  "));
			let ans2 = document.createElement("p");
			ans2.appendChild(document.createTextNode(this.translate('answer2') + " (2)  "))
			let ans3 = document.createElement("p");
			ans3.appendChild(document.createTextNode(this.translate('answer3') + " (3)  "))

			if (this.keyPressed == 48) {
				ans0.classList.add("selected");
				this.keyPressed = 0;
			} else if (this.keyPressed == 49) {
				ans1.classList.add("selected");
				this.keyPressed = 0;
			} else if (this.keyPressed == 50) {
				ans2.classList.add("selected");
				this.keyPressed = 0;
			} else if (this.keyPressed == 51) {
				ans3.classList.add("selected");
				this.keyPressed = 0;
			}

			questionsDiv.appendChild(ans0);
			questionsDiv.appendChild(ans1);
			questionsDiv.appendChild(ans2);
			questionsDiv.appendChild(ans3);

			spanElement.appendChild(questionsDiv);

			wrapper.appendChild(spanElement);
		}
		return wrapper;
	},

	// ----------------------------------------------------------------------------------------------------
	getQuestions: function () {
		var numberOfDay = moment().isoWeekday();
		//Determino si es un dia de la semana par (3 preguntas) o impar (4 preguntas):
		var numberOfQuestions = (numberOfDay % 2 == 1) ? 4 : 3;
		var numberOfOddsEvenDays = Math.trunc(numberOfDay / 2);

		if (numberOfDay % 2 == 1) {
			var startQuestion = 3 * numberOfOddsEvenDays + 4 * numberOfOddsEvenDays + 1;
		} else {
			var startQuestion = 3 * (numberOfOddsEvenDays - 1) + 4 * numberOfOddsEvenDays + 1;
		}

		var listOfQuestions = [];

		for (var i = startQuestion; i < (startQuestion + numberOfQuestions); i++) {
			listOfQuestions.push({
				"questionText": this.translate('question' + i),
				"numberQuestion": i
			});
		}
		return listOfQuestions;
	},

	// ----------------------------------------------------------------------------------------------------
	//Para comunicar al espejo con un determinado modulo, utilizando notificaciones
	notificationReceived: function (notification, payload, sender) {

		var self = this;

		//Para coger el nombre de usuario que se ha puesto frente al espejo
		if (notification === "USERS_LOGIN" && sender.name === "MMM-Face-Reco-DNN") {
			//Bucle que recorre todos los usuarios logueados
			for (var i = 0; i < payload.users.length; i++) {
				//Variables globales
				this.config.user = payload.users[i];
				this.config.age = payload.ages[i];
				this.config.gender = payload.genders[i];

				//Escribo metadatos en el archivo
				console.log("Escribiendo Usuario: " + payload.users[i] + "\nEdad: " + payload.ages[i] + "\nGénero: " + payload.genders[i]);
				this.sendSocketNotification('WRITE_METADATA', {
					user: payload.users[i],
					age: payload.ages[i],
					gender: payload.genders[i]
				});
			}

		} else if (notification === "START_QUESTIONS") {

			this.status = 3;

			//Una vez que lo recibo muestro la primera pregunta
			//Obtengo las preguntas que voy a mostrar
			this.questions = this.getQuestions();

			//De momento muestro la de inicio
			this.config.question = this.translate("intro-question-1");
			this.config.numQuestion = -1;
			this.config.numQuestionList = this.questions[0].numberQuestion - 1;

			//Text-to-speech pregunta
			this.sendNotification('SAY_SPEECH', self.translate("intro-question-1"));
			this.updateDom(2000);

			//Para coger la respuesta del cuestionario via voz
		} else if (this.status == 0 && notification === "SPEECH_TEXT") {

			console.log("SPEECH_TEXT");

			//Compruebo que nivel se ha votado
			var key = -1;
			console.log(payload.text.toLowerCase());
			switch (payload.text.toLowerCase()) {
				case this.translate('answer0').toLowerCase():
					key = 48;
					this.keyPressed = 48;
					this.updateDom();
					break;

				case this.translate('answer1').toLowerCase():
					key = 49;
					this.keyPressed = 49;
					this.updateDom();
					break;

				case this.translate('answer2').toLowerCase():
					key = 50;
					this.keyPressed = 50;
					this.updateDom();
					break;

				case this.translate('answer3').toLowerCase():
					key = 51;
					this.keyPressed = 51;
					this.updateDom();
					break;
			}

			if (key == 48 || key == 49 || key == 50 || key == 51) {
				this.sendSocketNotification('DO_QUESTION', {
					question: this.config.question,
					questionsList: this.questions,
					numQuestion: this.config.numQuestion, // de 0 a 4 o 3 depende del dia
					numQuestionList: this.config.numQuestionList, //de 1 a 25
					keyPressed: key,
					user: this.config.user
				});
			}

		}
	},

	// ----------------------------------------------------------------------------------------------------
	socketNotificationReceived: function (notification, payload) {
		let self = this;
		switch (notification) {
			case "NEW_QUESTION":
				this.config.question = payload.question;
				this.config.numQuestion = payload.numQ;
				this.config.numQuestionList = payload.numQList;

				this.status = 0;

				setTimeout(function () {
					self.sendNotification('SAY_SPEECH', self.translate('last_week') + " " + payload.question);
					self.updateDom(2000);
				}, 1000);
				break;

			case "NO_QUESTION":
				this.status = 1;
				//Quito el evento del teclado
				document.removeEventListener('keypress', function () { });
				this.updateDom(2000);

				this.sendNotification("NO_MORE_QUESTIONS");
				this.sendNotification("DO_BREATHWORK");
				break;
		}
	},
})


