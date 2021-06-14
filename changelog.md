# Changelog

**./javascript.js**
* Requirements:
	* Added 'fs'
	* Removed './src-nodejs/inp-file'
* Rewrote the 'callInputRetrieval' function.
	* Used to retrieve input file size.
	* If the file does not exist, a negative value will be returned without error.
	* This is so that the input file can be created safely.
* Wrote new function 'handleInputRead'
	* Used to read existing input file, or create it if necessary.
	* If the file is too large, a custom error will be displayed.
* Changes to 'displayAsciiArt'
	* Renamed 'artObj' parameter to 'asciiText'
	* Replaced 'artObj.asciiText' with 'asciiText'
* Rewrote 'runAsciiDisplay' function to reflect new code structure.

---

**./src-nodejs/inp-file.js**
* Moved global variables to main file:
	* placeholderText
	* 'maxSize' as 'maxFileSize'
* Removed header comment.
