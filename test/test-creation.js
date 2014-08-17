/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var yo = require('yeoman-generator');


// ---


describe('umd generator', function () {

  beforeEach(function (done) {
    yo.test.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = yo.test.createGenerator('umd:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });


  // ---


  it('creates expected files', function (done) {

    var expected = [
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json'
    ];

    yo.test.mockPrompt(this.app, {
      'moduleName': 'somename'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      yo.assert.file(expected);
      done();
    });
  });


  // ---


  it('prompted options are correctly used', function (done) {

    yo.test.mockPrompt(this.app, {
      'moduleName': 'somename'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      yo.assert.fileContent('package.json', /somename/);
      done();
    });
  });
});
