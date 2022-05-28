# Módulo Feeling Good: cuestionario diario para el control de la ansiedad y la depresión.

Este módulo realiza un cuestionario diario para que, al final de la semana, se puedan obtener resultados acerca del estado mental del usuario. Para ello se analizan los síntomas padecidos en la depresión y la ansiedad, utilizando variaciones de los cuestionarios de salud mental PHQ-9 (depresión) y BAI (ansiedad).
Funciona utilizando el módulo de reconocimiento facial [MMM-Face-Reco-DNN](https://github.com/nischi/MMM-Face-Reco-DNN) modificado para que además obtenga metadatos como el género, la edad... Los metadatos son recogidos en un archivo .txt y las respuestas en un .csv.

Este módulo pretende ser una herramienta adicional para [MagicMirror²](https://magicmirror.builders/).

## Estado de desarrollo

Este módulo por el momento es funcional, pero no cuenta con archivos de testing y podría ser modificado para más enfermedades mentales o para otros proyectos que se necesiten.

## Capturas de pantalla

Las capturas se pueden encontrar en la memoria del proyecto.

## Dependencias

No necesita dependencias para que pueda funcionar correctamente.

## Instalación del módulo
Hay que cargar el módulo directamente de GitHub usando estos comandos:

```sh
cd ~/MagicMirror/modules/
git clone url_repositorio_modulo
cd MMM-Feeling-Good
npm install
npm install fs
npm install child_process
npm install moment
npm install csv-write-stream
```

### Uso del módulo

Para configurar el módulo en MagicMirror², agrega la siguiente sección al archivo `config.js` en el directorio `MagicMirror/config`.

```js
    {
			module: "MMM-Feeling-Good",
			position: "middle_center",
			//Mostrado para los usuarios que reconoce
			classes: 'known',
			config: {
				language: "es",
			}
		}
```

## Notificaciones

Este módulo envía notificaciones a otros módulos para activar el text-to-speech de las próximas preguntas, indicar que ha finalizado el cuestionario o indicar que va a comenzar el módulo de la respiración diafragmática.

| Notificación          | Dirección | Descripción                                            |
| --------------------- | --------- | ------------------------------------------------------ |
| `SAY_SPEECH`          | out       | Envía el texto que se desea que sea narrado            |
| `NO_MORE_QUESTIONS`   | out       | Envía señal de que el cuestionario diario ha finalizado|
| `DO_BREATHWORK`       | out       | Para iniciar el módulo de respiración diafragmática    |

## Asuntos que resolver

- Realizar tests unitarios.
