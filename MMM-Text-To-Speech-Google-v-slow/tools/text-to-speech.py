import signal
import argparse
import os
from gtts import gTTS

#Para manejar las senales de cierre
def signalHandler(signal, frame):
    global closeSafe
    closeSafe = True

#Para cerrar el script con CTRL+C
signal.signal(signal.SIGINT, signalHandler)

#####################################################################################################

#Saco los argumentos del comando de ejecucion del script Python
# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-t", "--text", type=str, required=True, default="", help = "Text to convert to speech")
ap.add_argument("-l", "--language", type=str, required=True, default="es-ES", help="Language of the speech")

args = vars(ap.parse_args())

speech = gTTS(text = args["text"], lang = args["language"], slow = False)

speech.save("text.mp3")
os.system("cvlc text.mp3")

#Borro el archivo
os.remove("text.mp3")


 