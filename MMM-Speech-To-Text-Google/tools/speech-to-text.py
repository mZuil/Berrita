import speech_recognition as sr
import json
import sys
import signal
from ctypes import *
from contextlib import contextmanager
import argparse

#Para enviar al node_helper informacion
def printMessage(message):
    print(message)
    sys.stdout.flush()

#Para manejar las senales de cierre
def signalHandler(signal, frame):
    global closeSafe
    closeSafe = True

#Para cerrar el script con CTRL+C
signal.signal(signal.SIGINT, signalHandler)

#Para quitar los warnings de ALSA
ERROR_HANDLER_FUNC = CFUNCTYPE(None, c_char_p, c_int, c_char_p, c_int, c_char_p)

def py_error_handler(filename, line, function, err, fmt):
    pass

c_error_handler = ERROR_HANDLER_FUNC(py_error_handler)

@contextmanager
def noalsaerr():
    asound = cdll.LoadLibrary('libasound.so.2')
    asound.snd_lib_error_set_handler(c_error_handler)
    yield
    asound.snd_lib_error_set_handler(None)



#####################################################################################################

#Saco los argumentos del comando de ejecucion del script Python
# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-m", "--microphone", type=int, required=True, default=2, help = "Id of microphone device")
ap.add_argument("-l", "--language", type=str, required=False, default="es-ES", help="Language of the speech")

args = vars(ap.parse_args())

with noalsaerr():
    r = sr.Recognizer()
    speech = sr.Microphone(device_index = args["microphone"])

    #Bucle infinito escuchando
    while True:
        with speech as source:
            audio = r.adjust_for_ambient_noise(source)
            audio = r.listen(source)
            try:
                recog = r.recognize_google(audio, language = args["language"])
                #Envio el texto al node_helper
                printMessage(recog)

            except sr.UnknownValueError:
                print("Google Speech Recognition no ha entendido audio")
            except sr.RequestError as e:
                print("Could not request results from Google Speech Recognition service; {0}".format(e))
