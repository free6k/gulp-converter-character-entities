'use strict';
var assert = require('stream-assert');
var should = require('should');
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var cce = require(path.join(__dirname, '/../index'));
require('mocha');

var fixture = path.join(__dirname, '/fixtures/test.html');

describe('gulp-converter-character-entities', function () {

	describe('cce()', function () {

		it('should emit error on bad options', function (done) {
			gulp.src(fixture)
				.pipe(cce.convert(['hello']))
				.on('error', function (err) {
					err.message.should.eql('options must be Object');
					done();
				});
		});

		it('should emit error on bad options.entity', function (done) {
			gulp.src(fixture)
				.pipe(cce.convert({entity: ['hello']}))
				.on('error', function (err) {
					err.message.should.eql('options.entity must be Object');
					done();
				});
		});

		it('should emit error on streamed file', function (done) {
			gulp.src(fixture, {buffer: false})
				.pipe(cce.convert())
				.on('error', function (err) {
					err.message.should.eql('Streaming not supported');
					done();
				});
		});

		it('should replace entity html to xml', function (done) {
			gulp.src(fixture)
				.pipe(cce.convert({entity: cce.entities.html2xml}))
				.pipe(assert.length(1))
				.pipe(assert.first(function (d) {
					d.contents.toString().should.not.containEql('&nbsp;');
					d.contents.toString().should.containEql("&#160;");
				}))
				.pipe(assert.end(done));
		});

	});

});


