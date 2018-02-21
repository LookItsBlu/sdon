# sdon
sdon <-> json library for Soundodger


### Presentation

sdon is the name given to this customizable soundodger level file format made with the idea of making manual level editing easier and less prone to error by being able.

### Made for you, by you

sdon files were made with customization in mind, allowing people to download sdon files writen in the way they want it to be written.

The template creation process was made as easy as possible, simply modify the sdon.formats.js file by adding a new array entry to the object with the format name of your choice, and you can now create the templates that you want to use!

### Customization Limitations

- markers will always be surrounded by { }
- the mp3 path, song name, artist name, designer and subtitle will always be surrounded by ""
- color codes will always be translated into their respective hex codes
- the characters '{' and '}' cannot be used
- input points must be separated by at least one character
- commas cannot be used to separate input points

everything else in sodn files are entirely customizable by anyone.
