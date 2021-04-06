REM - ASCII Display Demo - Windows Batch.


REM - Initialize script.
@echo off
title ASCII Display Demo
cls
color 07

REM - Declare variables.
SET fileName=ascii.txt
SET /A maxSize=100000
SET /A fileSize=-1
SET prevColour=-1
SET /A currentColourIndex=-1
SET currentColourValue=7

REM - Check if input file exists.
IF EXIST %fileName% (GOTO :readSize) ELSE (GOTO :placeholder)


:placeholder
REM - Creates input file.
echo ASCII art goes here > %fileName%
GOTO :beginIteration
REM - Close :placeholder


:readSize
REM - Reads and validates input file size.
FOR %%I in (%fileName%) DO SET fileSize=%%~zI
IF (%fileSize% GTR %maxSize%) (GOTO :fileTooLarge) ELSE (GOTO :beginIteration)
REM - Close :readSize


:beginIteration
cls
GOTO :chooseNextColour
REM - Close :beginIteration


:chooseNextColour
REM - Chooses text colour at random.
SET /A currentColourIndex=%random% %% 7

IF %currentColourIndex%==0 SET currentColourValue=9
IF %currentColourIndex%==1 SET currentColourValue=A
IF %currentColourIndex%==2 SET currentColourValue=B
IF %currentColourIndex%==3 SET currentColourValue=C
IF %currentColourIndex%==4 SET currentColourValue=D
IF %currentColourIndex%==5 SET currentColourValue=E
IF %currentColourIndex%==6 SET currentColourValue=F

REM - Ensures that colour is not displayed twice in a row.
REM - This still glitches sometimes. Not much I can do about it.
IF (%currentColourValue%==%prevColour%) (GOTO :chooseNextColour) ELSE (GOTO :displayText)

REM - Close :chooseNextColour


:displayText
REM - Displays ASCII art.
SET prevColour=%currentColourValue%
color 0%currentColourValue%
TYPE %fileName%
echo.
GOTO :endIteration

REM - Close :displayText



:endIteration
REM - One second delay between display.
PING -n 2 127.0.0.1 > nul
GOTO :beginIteration
REM - Close :endIteration



:fileTooLarge
echo ERROR: ASCII Art file cannot be larger than 100kb.
pause
exit
REM - Close :fileTooLarge