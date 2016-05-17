'use strict';

const assert = require('assert');
const utils = require('../lib/utils');

describe('utils', function() {
  describe('#getTagName', function() {
    it('should return the first item as tag name', function() {
      const node = ['hr'];
      assert.strictEqual(utils.getTagName(node), 'hr');
    });

    it('should return \'\' when there is no tag name', function() {
      const node = [];
      assert.strictEqual(utils.getTagName(node), '');
    });
  });

  describe('#isElement', function() {
    it('should treat a string as element', function() {
      assert.ok(utils.isElement('Hello world!'));
    });

    it('should treat an array which first item is string as element', function() {
      assert.ok(utils.isElement(['hr']));
    });
  });

  describe('#isAttributes', function() {
    it('should treat object as attributes', function() {
      assert.ok(utils.isAttributes({}));
    });

    it('should not treat array as attributes', function() {
      assert.ok(!utils.isAttributes([]));
    });

    it('should not treat `null` as attributes', function() {
      assert.ok(!utils.isAttributes(null));
    });

    it('should not treat `undefined` as attributes', function() {
      assert.ok(!utils.isAttributes(undefined));
    });
  });

  describe('#hasAttributes', function() {

  });
});
