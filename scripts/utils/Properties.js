'use strict';

const properties = require('./Read');
const fs = require('fs');
const path = require('path');
const util = require('util');

const options = {
  path: true,
  include: true,
  sections: true,
  variables: true,
  namespaces: true,
  separators: '=',
  comments: [';', '#'],
};

const configDir = '../../';

const target = process.NODE_ENV || 'development';

module.exports.load = function() {
  var props = {},
    env1 = {},
    env2 = {},
    env3 = {},
    env4 = {},
    filename = null;

  if (target === 'production' || target === 'development') {
    //NODE_ENV can be "production" or "development"
    //Load specific configuration depending on the environment
    filename = path.join(__dirname, configDir + '.env.' + target + '.local');
    if (fs.existsSync(filename)) {
      env1 = properties(filename, options);
    }

    filename = path.join(__dirname, configDir + '.env.' + target);
    if (fs.existsSync(filename)) {
      env2 = properties(filename, options);
    }
  }

  //Pass the specific configuration as external variables to the common
  //configuration
  // options.vars = env1;

  filename = path.join(__dirname, configDir + '.env.local');
  if (fs.existsSync(filename)) {
    env3 = properties(filename, options);
  }

  filename = path.join(__dirname, configDir + '.env');
  if (fs.existsSync(filename)) {
    env4 = properties(filename, options);
  }

  util._extend(props, env4);
  util._extend(props, env3);
  util._extend(props, env2);
  util._extend(props, env1);

  return props;
};
