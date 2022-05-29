# Módulo Cortana Background: módulo que proporciona información del estado del espejo

Este módulo muestra por pantalla mensajes informativos sobre el estado de la aplicación en un determinado momento, acompañado de un conjunto de animaciones de [Cortana](https://onewindows.es/2014/08/estas-son-las-animaciones-de-xiao-na-la-version-china-de-cortana/) que fueron utilizadas en China. Esta elaborado en consonancia con el resto de módulos, por lo que sirve como soporte informativo de ellos.

Este módulo pretende ser una herramienta adicional para [MagicMirror²](https://magicmirror.builders/).

## Estado de desarrollo

Este módulo por el momento es funcional, pero no cuenta con archivos de testing y podría ser modificado para otros proyectos que se necesiten.

## Capturas de pantalla

Las capturas se pueden encontrar en la memoria del proyecto.

## Dependencias

No necesita dependencias para que pueda funcionar correctamente.

## Instalación del módulo
Hay que cargar el módulo directamente de GitHub usando estos comandos:

```sh
cd ~/MagicMirror/modules/
git clone url_repositorio_modulo
cd MMM-Cortana-Background
npm install
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
    {
			module: "MMM-Cortana-Background",
			position: "top_center",
			//Mostrado en cualquier momento
			classes: 'always'
		}
```

## Notifications

Este módulo envía notificaciones a otros módulos para activar el text-to-speech o para indicar al módulo MMM-Feeling-Good que puede comenzar a mostrar el cuestionario de las preguntas.

| Notificación          | Dirección | Descripción                                            |
| --------------------- | --------- | ------------------------------------------------------ |
| `SAY_SPEECH`          | out       | Envía el texto que se desea que sea narrado            |
| `START_QUESTIONS`     | out       | Envía señal para que cuestionario diario comience      |

## Asuntos que resolver

- Realizar tests unitarios.
