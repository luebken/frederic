var assert = require('assert'),
    jasmine = require('jasmine-node'),
    loadManifestFile = require('../frederic').loadManifestFile;


describe('loadManifestFile', function(){
  it('should get the data of a file when passing an existing file', function(){
      runs(function(){
          var callback = function(err, data) {
              expect(err).toBeNull();
              expect(data.length).toBeGreaterThan(50);
              expect(data.indexOf('exports.loadManifestFile')).toBeGreaterThan(3);
         }
         loadManifestFile('frederic.js', callback); 
      });
      waits(1);
  });
});