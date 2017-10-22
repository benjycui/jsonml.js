'use strict';

const assert = require('assert');
const html = require('../lib/html');
const utils = require('../lib/utils');

describe('utils', function() {
  describe('#isFragment', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.isFragment, 'function');
    });

    it('should return true for a fragment', function() {
      assert.strictEqual(utils.isFragment(['']), true);
      assert.strictEqual(utils.isFragment(['', 'hello world']), true);
    });

    it('should return false for non-array types', function() {
      assert.strictEqual(utils.isFragment(0), false);
      assert.strictEqual(utils.isFragment('no'), false);
      assert.strictEqual(utils.isFragment(false), false);
      assert.strictEqual(utils.isFragment(null), false);
      assert.strictEqual(utils.isFragment(undefined), false);
      assert.strictEqual(utils.isFragment({}), false);
    });
  });

  describe('#getTagName', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.getTagName, 'function');
    });

    it('should return the first item as tag name', function() {
      const node = ['hr'];
      assert.strictEqual(utils.getTagName(node), 'hr');
    });

    it('should return \'\' when there is no tag name', function() {
      const node = [];
      assert.strictEqual(utils.getTagName(node), '');
    });

    it('should require a jsonml node', function() {
      assert.throws(() => utils.getTagName(), Error);
      assert.doesNotThrow(() => utils.getTagName([]));
    });
  });

  describe('#isElement', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.getTagName, 'function');
    });

    it('should treat a string as element', function() {
      assert.strictEqual(utils.isElement('Hello world!'), true);
    });

    it('should treat an array which first item is string as element', function() {
      assert.strictEqual(utils.isElement(['hr']), true);
    });

    it('should not treat other data types as elements', function() {
      [8, true, null, undefined, {}].forEach(val => {
        assert.strictEqual(utils.isElement(val), false);
      });
    });
  });

  describe('#isAttributes', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.isAttributes, 'function');
    });

    it('should treat object as attributes', function() {
      assert.strictEqual(utils.isAttributes({}), true);
    });

    it('should not treat array as attributes', function() {
      assert.strictEqual(utils.isAttributes([]), false);
    });

    it('should not treat `null` as attributes', function() {
      assert.strictEqual(utils.isAttributes(null), false);
    });

    it('should not treat `undefined` as attributes', function() {
      assert.strictEqual(utils.isAttributes(undefined), false);
    });
  });

  describe('#hasAttributes', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.hasAttributes, 'function');
    });

    it('should return true when element has an attributes object', function() {
      assert.strictEqual(utils.hasAttributes(['p', {}]), true);
    });

    it('should throw an error when passed an invalid element', function() {
      [5, false, undefined, null, {}].forEach(val => {
        assert.throws(() => utils.hasAttributes(val), SyntaxError);
      });
      assert.doesNotThrow(() => utils.hasAttributes(''));
      assert.doesNotThrow(() => utils.hasAttributes(['']));
    });
  });

  describe('#getAttributes', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.getAttributes, 'function');
    });

    it('should return attributes from an element', function() {
      const jml = ['p', { foo: 'bar' }];
      const attrs = utils.getAttributes(jml);
      assert.strictEqual(attrs, jml[1]);
    });

    it('should return an empty object when element has no attributes', function() {
      const jml = ['p'];
      const attrs = utils.getAttributes(jml);
      assert.deepEqual(attrs, {});
      assert.strictEqual(jml[1], undefined);
    });

    it('should optionally add an empty attributes object when absent', function() {
      const jml = ['p'];
      const attrs = utils.getAttributes(jml, true);
      assert.deepEqual(attrs, {});
      assert.strictEqual(attrs, jml[1]);
    });

    it('should throw an error when passed an invalid element', function() {
      [5, false, undefined, null, {}].forEach(val => {
        assert.throws(() => utils.getAttributes(val), SyntaxError);
      });
      assert.doesNotThrow(() => utils.getAttributes(''));
      assert.doesNotThrow(() => utils.getAttributes(['']));
    });
  });

  describe('#addAttributes', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.addAttributes, 'function');
    });

    it('should require valid element and attributes params', function() {
      const jml = ['div'];
      const attrs = {};
      assert.doesNotThrow(() => utils.addAttributes(jml, attrs));
      assert.throws(() => utils.addAttributes(jml), SyntaxError);
      assert.throws(() => utils.addAttributes({}, attrs), SyntaxError);
    });

    it('should add attributes to an element without any', function() {
      const jml = ['div', ['p', 'hello world']];
      const attrs = { foo: 'bar' };
      utils.addAttributes(jml, attrs);
      assert.strictEqual(jml[1], attrs);
      assert.deepEqual(jml, ['div', { foo: 'bar' }, ['p', 'hello world']]);
    });

    it('should merge attributes onto an element with existing attributes', function() {
      const jml = ['div', { a: 1, b: 2 }, ['p', 'hello world']];
      const attrs = { a: 'x', c: 3 };
      utils.addAttributes(jml, attrs);
      assert.deepEqual(jml, ['div', { a: 'x', b: 2, c: 3 }, ['p', 'hello world']]);
    });

    it('should throw an error if element is a string', function() {
      assert.throws(() => utils.setAttribute('hello', {}), Error);
    });

    it('should throw an error when passed an invalid element', function() {
      [5, false, undefined, null, {}].forEach(val => {
        assert.throws(() => utils.addAttributes(val, {}), SyntaxError);
      });
      assert.doesNotThrow(() => utils.addAttributes(['foo'], {}));
    });
  });

  describe('#getAttribute', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.getAttribute, 'function');
    });

    it('should return an attribute value by key', function() {
      const jml = ['div', { a: 1 }, 'hello world'];
      assert.equal(utils.getAttribute(jml, 'a'), 1);
    });

    it('should return undefined if element has no attributes', function() {
      const jml = ['div', 'hello world'];
      assert.equal(utils.getAttribute(jml, 'a'), undefined);
    });

    it('should throw an error when passed an invalid element', function() {
      [5, false, undefined, null, {}].forEach(val => {
        assert.throws(() => utils.getAttribute(val), SyntaxError);
      });
      assert.doesNotThrow(() => utils.getAttribute(''));
      assert.doesNotThrow(() => utils.getAttribute(['']));
    });
  });

  describe('#setAttribute', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.setAttribute, 'function');
    });

    it('should set an attriute on an element without any', function() {
      const jml = ['p', 'hello world'];
      utils.setAttribute(jml, 'a', 1);
      assert.deepEqual(jml, ['p', { a: 1 }, 'hello world']);
    });

    it('should set an attribute on an element with existing attributes', function() {
      const jml = ['p', { a: 1 }, 'hello world'];
      utils.setAttribute(jml, 'b', 2);
      assert.deepEqual(jml, ['p', { a: 1, b: 2 }, 'hello world']);
    });

    it('should override an existing attribute value', function() {
      const jml = ['p', { a: 1 }, 'hello world'];
      utils.setAttribute(jml, 'a', 123);
      assert.deepEqual(jml, ['p', { a: 123 }, 'hello world']);
    });

    it('should throw an error if element is a string', function() {
      assert.throws(() => utils.setAttribute('hello'), Error);
    });

    it('should throw an error when passed an invalid element', function() {
      [5, false, undefined, null, {}].forEach(val => {
        assert.throws(() => utils.setAttribute(val), SyntaxError);
      });
      assert.doesNotThrow(() => utils.setAttribute(['']));
    });
  });

  describe('#appendChild', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.appendChild, 'function');
    });

    it('should throw an error if parent param cannot contain children', function() {
      const parent = 'hello';
      const child = 'world';
      assert.throws(() => utils.appendChild(parent, child), SyntaxError);
      assert.doesNotThrow(() => utils.appendChild(['p'], child));
    });

    describe('when appending a fragment', function() {
      it('should append all elements', function() {
        const jml = ['div'];
        const fragment = ['',
          ['em', 'hello'],
          ['strong', 'world'],
        ];
        utils.appendChild(jml, fragment);
        assert.deepEqual(jml, ['div', ['em', 'hello'], ['strong', 'world']]);
      });

      it('should not mutate child fragment param', function() {
        const jml = ['div'];
        const fragment = ['',
          ['em', 'hello'],
          ['strong', 'world'],
        ];
        utils.appendChild(jml, fragment);
        assert.deepEqual(fragment, ['',
          ['em', 'hello'],
          ['strong', 'world'],
        ]);
      });
    });

    describe('when appending an element', function() {
      it('should throw an error if child is not a valid element', function() {
        assert.throws(() => utils.appendChild(['div'], []), SyntaxError);
        assert.throws(() => utils.appendChild(['div'], [5]), SyntaxError);
        assert.throws(() => utils.appendChild(['div'], [null]), SyntaxError);
        assert.throws(() => utils.appendChild(['div'], [true]), SyntaxError);
      });

      it('should append a valid child element', function() {
        const jml = ['div'];
        const child = ['p'];
        utils.appendChild(jml, child);
        assert.deepEqual(jml, ['div', child]);
      });

      it('should append element with all descendents', function() {
        const jml = ['div', { a: 1}];
        const subtree = ['section',
          ['p', 'hello'],
          ['p', 'world'],
        ];
        utils.appendChild(jml, subtree);
        assert.deepEqual(jml, ['div', { a: 1 }, subtree]);
      });

      it('should execute an optional callback before appending (for JBST use)', function(done) {
        const jml = ['div'];
        const el = ['p'];
        utils.appendChild(jml, el, function onAppend(parent, child) {
          assert.strictEqual(jml, parent);
          assert.strictEqual(el, child);
          assert.deepEqual(jml, ['div']);
          done();
        });
      });
    });

    describe('when appending a raw child', function() {
      it('should append to the parent', function() {
        const jml = ['div'];
        const child = html.raw('string value');
        utils.appendChild(jml, child);
        assert.deepEqual(jml, ['div', child]);
      });
    });

    describe('when appending attributes', function() {
      it('should add attributes to the parent element', function() {
        const jml = ['div'];
        const attrs = { a: 1 };
        utils.appendChild(jml, attrs);
        assert.deepEqual(jml, ['div', { a: 1 }]);
      });
    });

    describe('when appending a defined, non-null value', function() {
      it('should append value to existing text node', function() {
        const jml = ['p', { a: 1 }, 'foo'];
        utils.appendChild(jml, 'bar');
        assert.deepEqual(jml, ['p', { a: 1 }, 'foobar']);
      });

      it('should coerce value to a string', function() {
        const jml = ['p', { a: 1 }, 'foo'];
        utils.appendChild(jml, 5);
        utils.appendChild(jml, true);
        assert.deepEqual(jml, ['p', { a: 1 }, 'foo5true']);
      });

      it('should append text node', function() {
        const jml = ['p'];
        utils.appendChild(jml, 'hello');
        assert.deepEqual(jml, ['p', 'hello']);
      });

      it('should not append an empty string', function() {
        const jml = ['p'];
        utils.appendChild(jml, '');
        assert.deepEqual(jml, ['p']);
      });

      // What is the use case for this behavior?
      // @TODO investigate and document
      it('should append child string to empty parent array', function() {
        const jml = [];
        utils.appendChild(jml, '');
        assert.deepEqual(jml, ['']);

        utils.appendChild(jml, 'x');
        assert.deepEqual(jml, ['', 'x']);

        utils.appendChild(jml, 'z');
        assert.deepEqual(jml, ['', 'xz']);
      });
    });
  });

  describe('#getChildren', function() {
    it('should export a function', function() {
      assert.equal(typeof utils.getChildren, 'function');
    });

    it('should return children when parent has attributes', function() {
      const jml = ['div', { a: 1, b: 2 },
        ['p', 'hello world'],
        'more text',
      ];
      const children = utils.getChildren(jml);
      assert.deepEqual(children, [
        ['p', 'hello world'],
        'more text',
      ]);
    });

    it('should return children when parent does not have attributes', function() {
      const jml = ['div',
        ['p', 'hello world'],
        'more text',
      ];
      const children = utils.getChildren(jml);
      assert.deepEqual(children, [
        ['p', 'hello world'],
        'more text',
      ]);
    });
  });
});
