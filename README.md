# Berrita: Desarrollo de un Espejo Inteligente como Apoyo para el Bienestar de la Salud Mental

En este proyecto se pueden encontrar los módulos implementados/modificados para cumplir los objetivos del proyecto: el control de las enfermedades mentales como la depresión o la ansiedad y la prevención de estas.

## Contenidos del proyecto

- Archivo configuración
  - Archivo config.js utilizado para el proyecto: contiene la configuración utilizada en el espejo inteligente para hacer funcionar el proyecto.
- Módulos implementados para el funcionamiento del espejo:
  - MMM-Breathwork: módulo de respiraciones diafragmáticas que ayuda a prevenir la ansiedad puesto que permite relajar al usuario.
  - MMM-Cortana-Background: módulo informativo para asegurar la buena experiencia de usuario, de modo que este conozca lo que ocurre por detrás del espejo e instrucciones para mejorar el entendimiento de los diversos pasos que seguir. 
  - MMM-Face-Reco-DNN: módulo modificado de reconocimiento facial que permite, no solo reconocer al usuario, sino detectar metadatos como su edad, género...
  - MMM-Feeling-Good: módulo con un cuestionario de control para la ansiedad y la depresión. Apunta los datos obtenidos en un csv y los metadatos recibidos en un txt.
  - MMM-Speech-To-Text-Google: módulo que convierte la voz en texto. Contiene comando de activación y desactivación para controlar por voz el espejo.
  - MMM-Text-To-Speech-Google: módulo que convierte el texto a voz. Permite asegurar la accesibilidad a todo tipo de usuarios. El resto de módulos emiten una notificación con el texto que se desea que sea narrado.
- Módulos implementados pero finalmente no utilizados:
  - MMM-Text-To-Speech-Google-v-slow: módulo que convierte el texto a voz, tal y como ocurría en MMM-Text-To-Speech-Google. Se descartó esta opción por la velocidad de reproducción del audio, que era muy lenta.
