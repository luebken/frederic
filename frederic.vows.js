//run with: node frederic.vows.js 

var vows = require('vows'),
    assert = require('assert');
    
var loadManifestFile = require('./frederic').loadManifestFile;

vows.describe('Loading a manifest file').addBatch({
    'when passing an existing file': {
        topic: function () {  
            loadManifestFile('frederic.js', this.callback);
        },
        'we get the data of that file': function (err, topic) {
            assert.equal(null, err);
            assert.notEqual(null, topic);
            assert.ok(topic.length > 50);
            assert.ok(topic.indexOf('exports.loadManifestFile') > 1);
        }
    },
    'when passing a non existing file': {
        topic: function () {  
            loadManifestFile('a-non-existing-file.js', this.callback);
        },
        'we get the data of that file': function (err, topic) {
            assert.notEqual(null, err);
            assert.equal(null, topic);
        }
    }
}).run(); 