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

if (!fs.existsSync('../../.env.' + target)) {
  fs.writeFileSync('../../.env.' + target, '');
}

if (!fs.existsSync('./.env')) {
  fs.writeFileSync('./.env', '');
}

module.exports.load = function() {
  var props = {};

  //NODE_ENV can be "production" or "development"
  //Load specific configuration depending on the environment
  var env1 = properties(path.join(__dirname, configDir + '.env.' + target), options);

  //Pass the specific configuration as external variables to the common
  //configuration
  options.vars = env1;

  var env2 = properties(path.join(__dirname, configDir + '.env'), options);

  util._extend(props, env2);
  util._extend(props, env1);

  return props;
};
