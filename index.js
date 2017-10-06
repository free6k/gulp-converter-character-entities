'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');

var replacer = function (text, data) {
	Object.keys(data).map(function (key) {
		text = text.replace(new RegExp(key,"gi"), data[key]);
	});

	return text;
}

var default_options = {
	entity: {}
}

function gulpCCE(options) {

	options = options || default_options;

	return through.obj(function (file, enc, cb) {

		if (typeof options === 'undefined' || Object.prototype.toString.call(options) !== '[object Object]') {
			this.emit('error', new PluginError('gulp-converter-character-entities', 'options must be Object'));
			return cb(null, file);
		}

		if (typeof options === 'undefined' || Object.prototype.toString.call(options.entity) !== '[object Object]') {
			this.emit('error', new PluginError('gulp-converter-character-entities', 'options.entity must be Object'));
			return cb(null, file);
		}

		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isStream()) {
			this.emit('error', new PluginError('gulp-converter-character-entities', 'Streaming not supported'));
			return cb(null, file);
		}

		var text = null;

		if (file.isBuffer()) {
			text = file.contents.toString();
			text = replacer(text, options.entity);
		}

		if (typeof text !== 'undefined' && text) {

			if (file.isBuffer()) {
				file.contents = new Buffer(text);
			}
		}

		cb(null, file);
	});

}

module.exports = {
	convert: gulpCCE,
	entities: {
		html2xml: require(path.join(__dirname, '/entities/html2xml.json'))
	}
};
