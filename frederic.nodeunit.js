//run with nodeunit frederic.nodeunit.js 

var vows = require('vows'),
    assert = require('assert'),
    http = require('http');
    
var loadManifestFile = require('./frederic').loadManifestFile,
    loadManifestUrl = require('./frederic').loadManifestUrl;


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

exports['when passing an non existing file we should get the data of that file'] = function(test){
    var callback = function(err, data) {
        test.notEqual(null, err);
        test.equal(null, data);
        test.done();        
    }
    loadManifestFile('a-non-existing-file.js', callback);
};

//----------

exports['when calling loadManifestUrl the correct options are passed to http.get'] = function(test) {
    var http_get_save = http.get;
    
    http.get = function(options, param2) {
        test.equal(options.host, 'www.frederic.de')
        test.equal(options.port, '80')
        test.equal(options.path, '/manifest.mf')
        test.done();
        return { on:function() {} };
    };
    loadManifestUrl('http://www.frederic.de/manifest.mf', null);
    
    http.get = http_get_save;
}

