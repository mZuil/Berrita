# Módulo Breathwork: actividad de respiración diafragmática

Este módulo muestra por pantalla un ejercicio de respiración diafragmática que ayuda a prevenir la ansiedad puesto que permite relajar al usuario. La funcionalidad es la que aparece en el módulo [MMM-Breathwork](https://github.com/yashatgit/MMM-Breathwork), pero ha sido modificado para adecuarlo a los tiempos adecuados para el proyecto.

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
cd MMM-Breathwork
npm install
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
    {
			module: "MMM-Breathwork",
			position: "middle_center",
			//Mostrado en cualquier momento
			classes: 'always'
		}
```

## Notifications

Este módulo envía notificaciones a otros módulos para activar el text-to-speech.

| Notificación          | Dirección | Descripción                                            |
| --------------------- | --------- | ------------------------------------------------------ |
| `SAY_SPEECH`          | out       | Envía el texto que se desea que sea narrado            |
| `START_QUESTIONS`     | out       | Envía señal para que cuestionario diario comience      |

## Asuntos que resolver

- Realizar tests unitarios.
