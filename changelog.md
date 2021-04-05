# Changelog

**windows.bat**
* When creating a placeholder input file, size validation will be skipped.
	* Since the placeholder is only a single line of text, validation is not necessary.
	* After `:placeholder` is complete, it will call `:beginIteration`
