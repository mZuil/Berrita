# Módulo Speech to Text de Google: conversión de voz a texto con API de Google

Este módulo realiza una conversión de voz a texto. Además tiene una palabra de activación que permite comenzar el envío de las notificaciones de un módulo a otro con aquello que el usuario dice; y otro comando de desactivación para dejar de enviar dichas notificaciones.

Este módulo pretende ser una herramienta adicional para [MagicMirror²](https://magicmirror.builders/).

## Estado de desarrollo

Este módulo por el momento es funcional, pero no cuenta con archivos de testing y podría ser modificado para más enfermedades mentales o para otros proyectos que se necesiten.

## Capturas de pantalla

Las capturas se pueden encontrar en la memoria del proyecto.

## Dependencias

- Micrófono

## Instalación del módulo
Hay que cargar el módulo directamente de GitHub usando estos comandos:

```sh
cd ~/MagicMirror/modules/
git clone url_repositorio_modulo
cd MMM-Feeling-Good
npm install
npm install string-similarity 
npm install python-shell
npm install signal-exit
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
	{
		module: "MMM-Speech-To-Text-Google",
		classes: "known"
	},
```

## Notificaciones

Este módulo envía notificaciones a otros módulos para activar el text-to-speech de las próximas preguntas, indicar que ha finalizado el cuestionario o indicar que va a comenzar el módulo de la respiración diafragmática.

| Notificación          | Dirección | Descripción                                                |
| --------------------- | --------- | ---------------------------------------------------------- |
| `IS_LISTENING`        | out       | Señal de que el comando de activación ha sido utilizado    |
| `IS_NOT_LISTENING`    | out       | Señal de que el comando de desactivación ha sido utilizado |
| `SPEECH_TEXT`         | out       | Envío de lo que el usuario pronuncia en formato texto      |

## Asuntos que resolver

- Realizar tests unitarios.