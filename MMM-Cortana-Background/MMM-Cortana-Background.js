Module.register("MMM-Cortana-Background", {

	currentGif: "./modules/MMM-Cortana-Background/assets/intro.gif",
	currentText: "",

	// ----------------------------------------------------------------------------------------------------
	getTranslations: function () {
		//Para acceder a un literal: this.translate('nombre_literal')
		return {
			es: 'translations/es.json',
		};
	},

	// ----------------------------------------------------------------------------------------------------
	getStyles: function () {
		return ["MMM-Cortana-Background.css"];
	},

	// ----------------------------------------------------------------------------------------------------
	//Funcion que imprime por pantalla el contenido en la pantalla
	getDom: function () {
		//Una vez tengo las preguntas de ese dia, las muestro por pantalla una a una
		const wrapper = document.createElement("div");
		wrapper.classList.add("same-row");

		var image = document.createElement("img");
		image.src = this.currentGif;
		image.classList.add("smaller", "mt-50");
		var text = document.createTextNode(this.currentText);

		wrapper.appendChild(image);
		wrapper.appendChild(text)
		return wrapper;
	},

	// ----------------------------------------------------------------------------------------------------
	//Para comunicar al espejo con un determinado modulo, utilizando notificaciones
	notificationReceived: function (notification, payload, sender) {

		var self = this;

		switch (notification) {

			case "DOM_OBJECTS_CREATED":
				this.currentText = this.translate('welcome');
				this.sendNotification('SAY_SPEECH', this.currentText);
				//Como tarda un poco más en cargarse el audio
				setTimeout(function () {
					self.updateDom();
				}, 1000);



				setTimeout(function () {
					self.currentGif = "./modules/MMM-Cortana-Background/assets/thinking.gif";
					self.currentText = self.translate('wait_face_reco');
					self.updateDom();
					self.sendNotification('SAY_SPEECH', self.currentText);
				}, 7000);
				break;

			case "USERS_LOGIN":

				this.currentGif = "./modules/MMM-Cortana-Background/assets/greeting_3.gif";
				let nombre = payload.users[0].charAt(0).toUpperCase() + payload.users[0].slice(1);
				this.currentText = this.translate('greeting_with_name').replace("$user", nombre);
				this.updateDom();
				this.sendNotification('SAY_SPEECH', this.currentText);

				setTimeout(function () {
					self.currentGif = "./modules/MMM-Cortana-Background/assets/calm.gif";
					self.currentText = self.translate('asking_questions');
					self.updateDom();
					self.sendNotification('SAY_SPEECH', self.currentText);

				}, 5000);

				setTimeout(function () {
					self.currentGif = "./modules/MMM-Cortana-Background/assets/calm.gif";
					self.currentText = self.translate('talk_to_me');
					self.updateDom();
					self.sendNotification('SAY_SPEECH', self.currentText);

				}, 12000);

				setTimeout(function () {
					self.sendNotification("START_QUESTIONS");
				}, 19000);


				break;

			case "IS_LISTENING":
				this.currentGif = "./modules/MMM-Cortana-Background/assets/listening.gif";
				this.currentText = this.translate('do_not_talk_to_me');
				this.updateDom();
				this.sendNotification('SAY_SPEECH', this.currentText);
				break;

			case "IS_NOT_LISTENING":
				this.currentGif = "./modules/MMM-Cortana-Background/assets/calm.gif";
				this.currentText = this.translate('talk_to_me');
				this.updateDom();
				this.sendNotification('SAY_SPEECH', this.currentText);
				break;

			case 'NO_MORE_QUESTIONS':
				this.currentGif = "./modules/MMM-Cortana-Background/assets/heart.gif";
				this.currentText = this.translate('end_questions');
				this.updateDom();
				this.sendNotification('SAY_SPEECH', this.currentText);
				break;
		}
	},
})


