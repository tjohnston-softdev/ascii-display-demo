// ASCII Display Demo - Node JS

const inpFile = require("./src-nodejs/inp-file");
const inputFileName = "ascii.txt";
const supportedColours = [90, 91, 92, 93, 94, 95, 96, 97];
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
		chooseNextColour(colourValues);
		displayAsciiArt(retInp, colourValues.current);
		setPreviousColour(colourValues);
	}, 1000);
}


// Displays ASCII art to console.
function displayAsciiArt(artObj, colourValue)
{
	var setColour = "\x1b[" + colourValue + "m";
	var preparedText = [setColour, artObj.asciiText, "\x1b[39m"].join("");
	
	console.clear();
	console.log(preparedText);
}



// Choose next colour at random.
function chooseNextColour(colObj)
{
	var currentRandomIndex = -1;
	var currentValue = -1;
	var choiceMade = false;
	
	// Loop until a different colour has been chosen.
	while (choiceMade !== true)
	{
		currentRandomIndex = getRandomIndex();
		currentValue = supportedColours[currentRandomIndex];
		
		if (currentValue !== colObj.previous)
		{
			// Complete.
			colObj.current = currentValue;
			choiceMade = true;
		}
	}
}


// Save previous colour so it cannot be chosen next.
function setPreviousColour(colObj)
{
	var currentLocal = colObj.current;
	colObj.previous = currentLocal;
}



// Get random colour index.
function getRandomIndex()
{
	var seedValue = Math.random() * supportedColours.length;
	var randRes = Math.floor(seedValue);
	return randRes;
}