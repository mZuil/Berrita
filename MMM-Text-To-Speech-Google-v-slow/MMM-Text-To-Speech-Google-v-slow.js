Module.register("MMM-Text-To-Speech-Google-v-slow", {

	//Aqui se pueden meter variables que vendrian por defecto
	defaults: {
		language: "es-ES",
	},


	// ----------------------------------------------------------------------------------------------------
	//Esta funcion se ejecuta cuando el modulo se carga con exito
	start: function () {
		Log.info("Starting module: " + this.name);

		this.updateDom();
	},

	// ----------------------------------------------------------------------------------------------------
	//Funcion que imprime por pantalla el contenido en la pantalla
	getDom: function () {

		const wrapper = document.createElement("div");
		return wrapper;
	},

	// ----------------------------------------------------------------------------------------------------
	//Para comunicar al espejo con un determinado modulo, utilizando notificaciones
	notificationReceived: function (notification, payload, sender) {

		//Cuando recibe un mensaje para reproducir
		var self = this;
		if (notification === "SAY_SPEECH") {
			this.sendSocketNotification('SEND_TEXT', {
				text: payload,
				language: self.config.language
			});
		}
	},

})


