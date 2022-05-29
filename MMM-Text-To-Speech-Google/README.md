# Módulo Text to Speech de Google: conversión de texto a voz con API de Google

Este módulo realiza una conversión de texto a voz. Permite reproducir un audio recibido a través de una notificación.

Este módulo pretende ser una herramienta adicional para [MagicMirror²](https://magicmirror.builders/).

## Estado de desarrollo

Este módulo por el momento es funcional, pero no cuenta con archivos de testing y podría ser modificado para otros proyectos que se necesiten.

## Capturas de pantalla

Las capturas se pueden encontrar en la memoria del proyecto.

## Dependencias

- Altavoz
- mpg123. Para ello: `sudo apt-get install mpg123`

## Instalación del módulo
Hay que cargar el módulo directamente de GitHub usando estos comandos:

```sh
cd ~/MagicMirror/modules/
git clone url_repositorio_modulo
cd MMM-Feeling-Good
npm install
npm install gtts
npm install play-sound
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
	{
		module: 'MMM-Text-To-Speech-Google',
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