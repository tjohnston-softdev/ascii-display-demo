# ASCII Display Demo - Python

import os
import time
import random

# Reads size of input file.
def getInputFileSize():
  global inputFileName
  fileExists = os.path.exists(inputFileName)
  sizeRes = -1
  
  if fileExists:
    # Get file size in bytes.
    sizeRes = os.path.getsize(inputFileName)
  else:
    # Return empty.
    sizeRes = -1
  
  return sizeRes
# End 'getInputFileSize'


# Creates or reads input file as needed.
def readInputContents():
  global inputFileName
  global entrySize
  fileEntry = None
  readRes = ""
  
  if (entrySize > 0 and entrySize <= maxFileSize):
    # Valid size - Read contents.
    fileEntry = open(inputFileName, "r")
    readRes = fileEntry.read()
    fileEntry.close()
  elif (entrySize > maxFileSize):
    # File too large.
    raise Exception("Input file cannot be larger than 100kb")
  else:
    # Empty or missing - Create placeholder.
    fileEntry = open(inputFileName, "w")
    fileEntry.write(placeholderText)
    fileEntry.close()
    readRes = placeholderText
  
  return readRes
# End 'readInputContents'


# Chooses next colour for ASCII print.
def chooseRandomColour():
  global colourObject
  currentRandomIndex = -1
  currentValue = -1
  choiceMade = False
  
  # Update previous colour.
  previousColour = colourObject["current"]
  colourObject["previous"] = colourObject["current"]
  
  # Loop until different colour is chosen.
  while (choiceMade != True):
    
    # Choose random colour.
    currentRandomIndex = random.randrange(0, len(supportedColours))
    currentValue = supportedColours[currentRandomIndex]
    
    if (currentValue != previousColour):
      # Update current colour.
      colourObject["current"] = currentValue
      choiceMade = True
    # End If
  # End While
# End 'chooseRandomColour'


# Double checks that retrieved ASCII is not empty.
def checkOutputReady():
  global retrievedText
  strLength = len(retrievedText)
  checkRes = bool(strLength > 0)
  return checkRes
# End 'checkOutputReady'

# Clears console.
def clearConsole():
  if (os.name == "posix"):
    os.system("clear")
  else:
    os.system("cls")
  # End If
# End 'clearConsole'


# Displays ASCII text to console in current colour.
def displayAsciiArt():
  global retrievedText
  global colourObject
  
  colourValue = colourObject["current"]
  setColour = "\x1b[" + str(colourValue) + "m"
  preparedText = setColour + retrievedText + "\x1b[39m"
  print(preparedText)
# End 'displayAsciiArt'


# Waits one second before next print.
def handleWait():
  waitSuccessful = False
  
  # Using 'try-except' avoids error on terminate.
  try:
    time.sleep(1)
    waitSuccessful = True
  except:
    waitSuccessful = False
  # End 'try-except'
  
  return waitSuccessful
# End 'handleWait'


# Begin main code:

supportedColours = (90, 91, 92, 93, 94, 95, 96, 97)
inputFileName = "ascii.txt"
maxFileSize = 100000
placeholderText = "ASCII art goes here."
entrySize = getInputFileSize()
retrievedText = readInputContents()
colourObject = {"current": -1, "previous": 37}
canContinue = checkOutputReady()


# Loop forever.
while (canContinue == True):
  chooseRandomColour()
  clearConsole()
  displayAsciiArt()
  canContinue = handleWait()
# End while




# Same references as JavaScript.