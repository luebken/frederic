//run with nodeunit frederic.nodeunit.js 

var vows = require('vows'),
    assert = require('assert');
    
var loadManifestFile = require('./frederic').loadManifestFile;


exports['test the setup'] = function(test){
    test.equal(typeof loadManifestFile, 'function');
    test.done();
};

exports['when passing an existing file we should get the data of that file'] = function(test){
    var callback = function(err, data) {
        test.notEqual(null, data);
        test.ok(data.length > 50);
        test.ok(data.indexOf('exports.loadManifestFile') > 1);
        test.done();        
    }
    loadManifestFile('frederic.js', callback);
};

exports['when passing an existing file we should get the data of that file'] = function(test){
    var callback = function(err, data) {
        test.notEqual(null, err);
        test.equal(null, data);
        test.done();        
    }
    loadManifestFile('a-non-existing-file.js', callback);
};
