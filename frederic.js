var fs = require('fs'),
    http = require('http'),
    url = require('url');

exports.loadManifestFile = function(manifestFile, callback) {
	fs.readFile(manifestFile, 'utf8', function(err, data) {
		callback(err, data);
	});
};

var http_get_callback = function(manifestRes) {
	if (manifestRes.statusCode === 200) {
		manifestRes.setEncoding('utf8');
		manifestRes.on('data', function (data) {
			var mimeType = manifestRes.headers['content-type'],
				// Base URL: Location of cache manifest (without filename)
				baseUrl  = manifestUrl.href.substring(0, manifestUrl.href.lastIndexOf('/') + 1);

			callback(data, mimeType, baseUrl);
		});
	}
};
exports.http_get_callback = http_get_callback;

exports.loadManifestUrl = function(manifestUrl, callback) {
	manifestUrl = url.parse(manifestUrl);
	var options = {
			host: manifestUrl.hostname,
			port: manifestUrl.port || 80,
			path: manifestUrl.pathname
		};

	http.get(options, http_get_callback).on('error', function(e) {
		return false;
	});
};