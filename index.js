'use strict';

const utils = require('./lib/utils');
const dom = require('./lib/dom');
const html = require('./html');
Object.assign(module.exports, utils, dom, html);
