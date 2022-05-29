Module.register("MMM-Speech-To-Text-Google", {

	isListening: false,
	text: "",

	//Aqui se pueden meter variables que vendrian por defecto
	defaults: {
		microphone: 2,
		language: "es-ES",
		greeting: "Berrita", //palabra de activacion
		farewell: "A dormir" //palabra de desactivacion
		//timeout: 30, //tiempo antes de desactivarse
	},


	// ----------------------------------------------------------------------------------------------------
	//Esta funcion se ejecuta cuando el modulo se carga con exito
	start: function () {
		Log.info("Starting module: " + this.name);

		this.isListening = false;
		//this.updateDom();

		//Envio notificacion al node_helper con la configuracion actual para que comience a escuchar
		this.sendSocketNotification('CONFIG', this.config);
	},

	// ----------------------------------------------------------------------------------------------------
	getTranslations: function () {
		//Para acceder a un literal: this.translate('nombre_literal')
		return {
			es: 'translations/es.json',
		};
	},

	// ----------------------------------------------------------------------------------------------------
	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "START_LISTENING":
				console.log("IsListening");
				this.isListening = true;
				//this.updateDom(1000);
				this.sendNotification("IS_LISTENING");
				break;

			case "STOP_LISTENING":
				this.isListening = false;
				this.text = "";
				//this.updateDom(1000);
				this.sendNotification("IS_NOT_LISTENING");
				break;

			case "SPEECH_TEXT":
				this.sendNotification("SPEECH_TEXT", {
					text: payload
				});
				this.text = payload;
				//this.updateDom(1000);
				break;
		}
	},
})


