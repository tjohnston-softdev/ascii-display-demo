/*
	* Handles ASCII art input file.
	* Max size is 100kb
*/

const fs = require("fs");
const maxSize = 100000;
const placeholderText = "ASCII art goes here.";



// Check input file - Main.
function checkFileEntry(tgtPath)
{
	var dataObject = {};
	var checkResult = {flag: -1, message: ""};
	
	try
	{
		// Read and validate file entry.
		dataObject = fs.statSync(tgtPath);
		validateFileData(dataObject, checkResult);
	}
	catch(e)
	{
		// Error retrieving file entry.
		handleStatError(e.code, checkResult);
	}
	
	return checkResult;
}


// Read input file contents - Main.
function readFileContents(tgtPath)
{
	var readResult = defineAsciiText();
	var flaggedMessage = "";
	
	try
	{
		// Open and read.
		readResult.asciiText = fs.readFileSync(tgtPath, "utf8");
	}
	catch(e)
	{
		// Error.
		readResult = null;
		flaggedMessage = writeFileErrorMessage("reading", e.code);
		throw new Error(flaggedMessage);
	}
	
	return readResult;
}


// Create placeholder input file - Main.
function createPlaceholderFile(tgtPath)
{
	var createResult = defineAsciiText();
	var flaggedMessage = "";
	
	try
	{
		// Create placeholder.
		fs.writeFileSync(tgtPath, placeholderText, "utf8");
		createResult.asciiText = placeholderText;
	}
	catch(e)
	{
		// Error.
		createResult = null;
		flaggedMessage = writeFileErrorMessage("creating", e.code);
		throw new Error(flaggedMessage);
	}
	
	return createResult;
}


// Validate input file entry.
function validateFileData(dataObj, resObj)
{
	var correctType = dataObj.isFile();
	
	if (correctType === true && dataObj.size > 0 && dataObj.size <= maxSize)
	{
		// Valid.
		resObj.flag = 1;
	}
	else if (correctType === true && dataObj.size > maxSize)
	{
		// Too large.
		resObj.flag = -1;
		resObj.message = "Input file cannot be larger than 100kb";
	}
	else if (correctType === true)
	{
		// Empty - Create placeholder.
		resObj.flag = 0;
	}
	else
	{
		// Invalid file.
		resObj.flag = -1;
		resObj.message = "Input must be a valid file.";
	}
}


// Missing file entry.
function handleStatError(errorCodeString, resObj)
{
	if (errorCodeString === "ENOENT")
	{
		// File does not exist - Create placeholder.
		resObj.flag = 0;
	}
	else
	{
		// Error.
		resObj.flag = -1;
		resObj.message = writeFileErrorMessage("checking", errorCodeString);
	}
}



// Writes error message.
function writeFileErrorMessage(vAction, vErrorCode)
{
	var writeRes = "";
	
	writeRes += "Error ";
	writeRes += vAction;
	writeRes += " input file. - ";
	writeRes += parseErrorCode(vErrorCode);
	
	return writeRes;
}



// Converts FS error code to readable description.
function parseErrorCode(eCode)
{
	var parsedText = "";
	
	if (eCode === "EACCES")
	{
		parsedText = "Operation forbidden by access permissions.";
	}
	else if (eCode === "EISDIR")
	{
		parsedText = "Input path refers to a directory.";
	}
	else if (eCode === "EMFILE")
	{
		parsedText = "Too many files are open at once.";
	}
	else if (eCode === "ENOENT")
	{
		parsedText = "File does not exist.";
	}
	else if (eCode === "EPERM")
	{
		parsedText = "Elevated permissions required.";
	}
	else
	{
		// Other
		parsedText = "Unknown cause.";
	}
	
	return parsedText;
}



// ASCII text object.
function defineAsciiText()
{
	var defineRes = {asciiText: ""};
	return defineRes;
}




module.exports =
{
	checkEntry: checkFileEntry,
	readContents: readFileContents,
	createPlaceholder: createPlaceholderFile
};