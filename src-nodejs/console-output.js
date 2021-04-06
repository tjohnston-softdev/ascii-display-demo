/*
	* Displays ASCII art to console.
	* Source: https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2
	* Retrieved: 2021-04-06
*/


function displayAsciiArt(artObj, colourValue)
{
	var setColour = "\x1b[" + colourValue + "m";
	var preparedText = [setColour, artObj.asciiText, "\x1b[39m"].join("");
	
	console.clear();
	console.log(preparedText);
}



module.exports =
{
	displayArt: displayAsciiArt
};