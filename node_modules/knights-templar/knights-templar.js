var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var precompiled = {};

// File reading method
function getFileContents(path) {

    // check precompiled paths
    if (precompiled.hasOwnProperty(path)) {
        return precompiled[path];
    }

    // check for browser
    if (typeof window !== 'undefined') {

        // make synchronous XHR
        var xhr = new XMLHttpRequest();
        xhr.open('get', (window.KT_BASE_URL || '/') + path, false);
        var res = xhr.send();
        return xhr.response;

    } else {
        // Check file existence
        if (! fs.existsSync(path) ) throw new Error("Template file could not be found. Given path: `"+path+"`. cwd: `"+process.cwd()+"`.");
        return fs.readFileSync(path).toString('utf8');
    }
}

// Registers precompiled templates object.
// This can be a map of path:template_strings
// or path:template_function.
function registerPrecompiled(precomp) {
    precompiled = precomp;
}

// Main make method
function make(path, type) {
    
    // Read the file
    var file_contents = getFileContents(path);
    
    // Return functions
    if (typeof file_contents === 'function') {
        return file_contents;
    }

    // Return the compiled template        
    return _.template(file_contents);
}

exports.make = make;
exports.registerPrecompiled = registerPrecompiled;