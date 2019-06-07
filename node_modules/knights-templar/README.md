knights-templar
==========

[![Build Status](https://travis-ci.org/andyperlitch/knights-templar.png)](https://travis-ci.org/andyperlitch/knights-templar)

compile ye underscore templates from doth external files in node.js (or browserify).

## usage

    var kt = require('knights-templar');
    var template = kt.make(__dirname+'/template.html');
    var markup = template({ name: 'andy', age: 24 });

## methods

### kt.make(path)

Compiles content from a file located at `path` into an underscore template function.

### kt.registerPrecompiled(precompiled_map)

You can use precompiled templates by registering them with this method at the beginning of your node.js or browserify app.
The format of `precompiled_map` should be an object where keys are the path to a template file (e.g. an html file) and 
values are either the content of the template or a compiled template function. For example:

	var precomp = {
		// if its the template string, compilation will happen at run-time
		'/path/to/some/template.html': '<div> <%= variable %> </div>'

		// this way, everything is precompiled
		'/path/to/another/template.html': function(obj){
			// precompiled gobble-dee-gook
		}
	}

	var knight = require("knights-templar");
	knight.registerPrecompiled(precomp);
	var template = knight.make('/path/to/some/template.html'); // will use the one from precomp
	template({variable: 'interpolate me!'});

##license
MIT