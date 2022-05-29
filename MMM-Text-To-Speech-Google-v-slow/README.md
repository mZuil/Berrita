# Módulo Text to Speech de Google: conversión de texto a voz con API de Google

Este módulo realiza una conversión de texto a voz. Permite reproducir un audio recibido a través de una notificación.
Fue descartado puesto que la respuesta era lenta ya que tenía que crear un Shell 

Este módulo pretende ser una herramienta adicional para [MagicMirror²](https://magicmirror.builders/).

## Estado de desarrollo

Este módulo fue abandonado para la realización de uno que funcionase más rápido (MMM-Text-To-Speech-Google), pero puede ser modificado.

## Capturas de pantalla

Las capturas se pueden encontrar en la memoria del proyecto.

## Dependencias

- Altavoz
- gtts. Para ello: `pip install gTTS`

## Instalación del módulo
Hay que cargar el módulo directamente de GitHub usando estos comandos:

```sh
cd ~/MagicMirror/modules/
git clone url_repositorio_modulo
cd MMM-Feeling-Good
npm install
npm install python-shell
npm install signal-exit
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
	{
		module: 'MMM-Text-To-Speech-Google-v-slow',
		classes: "always",
		config: {
			language: "es-ES"
		}
	},
```

## Recepción de textos

Para poder reproducir los diversos textos recibidos es necesario que desde el resto de módulos se envíe dicho escrito mediante el siguiente comando:

```js
	this.sendNotification('SAY_SPEECH', 'Texto a convertir');
```

## Notificaciones

Este módulo no envía notificaciones a otros módulos.

## Asuntos que resolver

- Realizar tests unitarios.