// ASCII Display Demo - Node JS

const inpFile = require("./src-nodejs/inp-file");
const textColours = require("./src-nodejs/text-colours");
const consoleOutput = require("./src-nodejs/console-output");
const inputFileName = "ascii.txt";
runAsciiDisplay();


// Main function.
function runAsciiDisplay()
{
	var inputFileExists = inpFile.checkEntry(inputFileName);
	var retrievedInput = callInputRetrieval(inputFileExists);
	
	if (retrievedInput !== null)
	{
		callDisplayLoop(retrievedInput);
	}
}



// Retrieves ASCII input.
function callInputRetrieval(existObj)
{
	var retData = null;
	
	if (existObj.flag > 0)
	{
		// Read existing file.
		retData = inpFile.readContents(inputFileName);
	}
	else if (existObj.flag === 0)
	{
		// Create placeholder.
		retData = inpFile.createPlaceholder(inputFileName);
	}
	else
	{
		// Invalid file.
		throw new Error(existObj.message);
	}
	
	return retData;
}


// ASCII display loop.
function callDisplayLoop(retInp)
{
	var colourValues = {current: -1, previous: 37};
	
	
	// Run every second.
	setInterval(function()
	{
		textColours.chooseNext(colourValues);
		consoleOutput.displayArt(retInp, colourValues.current);
		textColours.setPrevious(colourValues);
	}, 1000);
}