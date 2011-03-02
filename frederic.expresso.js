var assert = require('assert'),
    loadManifestFile = require('./frederic').loadManifestFile;
require('should');

exports['when passing an existing file we should get the data of that file'] = function(beforeExit){
    var callback = function(err, data) {
        data.should.not.be.empty;
        data.length.should.be.above(10);
        data.should.include.string('exports.loadManifestFile');
    }
    loadManifestFile('frederic.js', callback);
};

exports['when passing an non existing file we should get the data of that file'] = function(test){
    var callback = function(err, data) {
        assert.notEqual(err, null);
        assert.equal(data, null);
    }
    loadManifestFile('a-non-existing-file.js', callback);
};
