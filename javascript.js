// ASCII Display Demo - Node JS

const fs = require("fs");
const inputFileName = "ascii.txt";
const maxFileSize = 100000;
const placeholderText = "ASCII art goes here.";
const supportedColours = [90, 91, 92, 93, 94, 95, 96, 97];
runAsciiDisplay();


// Main function.
function runAsciiDisplay()
{
	var inputFileSize = callInputRetrieval();
	var retrievedContents = handleInputRead(inputFileSize);
	
	if (retrievedContents.length > 0)
	{
		callDisplayLoop(retrievedContents);
	}
}



// Retrieves ASCII input.
function callInputRetrieval()
{
	var statObj = null;
	var retrievedSize = -1;
	
	try
	{
		statObj = fs.statSync(inputFileName);
		retrievedSize = statObj.size;
	}
	catch(e)
	{
		if (e.code === "ENOENT")
		{
			retrievedSize = -1;
		}
		else
		{
			throw e;
		}
	}
	
	return retrievedSize;
}


function handleInputRead(inpSize)
{
	var readRes = "";
	
	if (inpSize > 0 && inpSize <= maxFileSize)
	{
		readRes = fs.readFileSync(inputFileName, "utf8");
	}
	else if (inpSize > maxFileSize)
	{
		throw new Error("Input file cannot be larger than 100kb");
	}
	else
	{
		fs.writeFileSync(inputFileName, placeholderText, "utf8");
		readRes = placeholderText;
	}
	
	return readRes;
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
function displayAsciiArt(asciiText, colourValue)
{
	var setColour = "\x1b[" + colourValue + "m";
	var preparedText = [setColour, asciiText, "\x1b[39m"].join("");
	
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