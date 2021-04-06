/*
	* This file handles text colours.
	* Colour Codes: https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit
	* Retrieved: 2021-04-06
*/


const supportedColours = [90, 91, 92, 93, 94, 95, 96, 97];
checkColourCount();


// Colour count validation.
function checkColourCount()
{
	if (supportedColours.length < 2)
	{
		throw new Error("At least two text colours must be defined.");
	}
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



module.exports =
{
	chooseNext: chooseNextColour,
	setPrevious: setPreviousColour
};