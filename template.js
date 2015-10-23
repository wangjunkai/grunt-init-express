/*
 * grunt-init-express
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 'Cowboy' Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a express plugin.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'express'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', function(value, data, done) {
      // Fix express capitalization.
      value = value.replace(/express/gi, 'express');
      done(null, value);
    }),
    init.prompt('description', 'The best express plugin ever.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('express_version')
  ], function(err, props) {
    // A few additional properties.
    props.expressjson = props.name + '.express.json';
    props.dependencies = {express: props.express_version || '>= 1'};

    props.keywords = [];
    props.script = {
      "start": "node www.js"
    };
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: 'express-plugin',
      version: '0.0.0-ignored',
      npm_test: 'grunt qunit',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0',
      devDependencies: {
        'grunt-contrib-jshint': '~0.10.0',
        'grunt-contrib-qunit': '~0.2.0',
        'grunt-contrib-concat': '~0.3.0',
        'grunt-contrib-uglify': '~0.2.0',
        'grunt-contrib-watch': '~0.4.0',
        'grunt-contrib-clean': '~0.4.0',
        "mongoose": "~3.8.8",
        'body-parser': '~1.13.2',
        'cookie-parser': '~1.3.5',
        'debug': '~2.2.0',
        'express': '~4.13.1',
        'jade': '~1.11.0',
        'morgan': '~1.6.1',
        'serve-favicon': '~2.3.0',
        "chalk": "~0.5"

      },
    });

    // Generate express.json file.
    init.writePackageJSON(props.expressjson, props, function(pkg, props) {
      // The express site needs the 'bugs' value as a string.
      if ('bugs' in props) { pkg.bugs = props.bugs; }
      return pkg;
    });

    // All done!
    done();
  });

};
