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
	var inputFileSize = getInputSize();
	var retrievedContents = handleInputRead(inputFileSize);
	
	if (retrievedContents.length > 0)
	{
		callDisplayLoop(retrievedContents);
	}
}



// Retrieves ASCII input.
function getInputSize()
{
	var statObj = null;
	var retrievedSize = -1;
	
	try
	{
		// Open file and read size.
		statObj = fs.statSync(inputFileName);
		retrievedSize = statObj.size;
	}
	catch(fileError)
	{
		if (fileError.code === "ENOENT")
		{
			// File does not exist. Return empty.
			retrievedSize = -1;
		}
		else
		{
			// Error retrieving size.
			throw fileError;
		}
	}
	
	return retrievedSize;
}


// Reads input ASCII file.
function handleInputRead(inpSize)
{
	var readRes = "";
	
	if (inpSize > 0 && inpSize <= maxFileSize)
	{
		// Read input file.
		readRes = fs.readFileSync(inputFileName, "utf8");
	}
	else if (inpSize > maxFileSize)
	{
		// File too large.
		throw new Error("Input file cannot be larger than 100kb");
	}
	else
	{
		// Create input file.
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



/*
	REFERENCES:
		(Title)								(URL)																					(Date Retrieved)
		Colour Codes						https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit							2021-04-06
		Display ASCII art to console.		https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2					2021-04-06
*/