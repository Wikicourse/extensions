tape.createStream({ objectMode: true }).on('data', 
  function (row) { 
    if (!row.ok) { 
      console.log(row['name']) 
    } 
  }); 

function createIsAssert(t, isThing) {
  const { assert } = t;
  return function() {
    const args = [...arguments];
    args[0] = isThing(args[0]);
    assert.apply(t, args);
  };
}

function fillAssert(t) {
  // TODO: extend tape so that its default function can also be used
  const assert = t.assert;

  assert.isArray = createIsAssert(t, _.isArray);
  assert.isBoolean = createIsAssert(t, _.isBoolean);
  assert.isString = createIsAssert(t, _.isString);
  assert.isNumber = createIsAssert(t, _.isNumber);
  assert.isUndefined = createIsAssert(t, _.isUndefined);

  assert.deepEqual = t.deepEqual;
  assert.equal = t.equal;
  assert.strictEqual = t.equal;
  assert.isTrue = t.is;
  assert.isFalse = t.isNot;

  assert.sameMembers = function sameMembers() {
    const [ first, second, ...args] = arguments;
    assert.apply(
      t,
      [
        _.difference(first, second).length === 0 &&
        _.difference(second, first).length === 0
      ].concat(args)
    );
  };

  assert.includeMembers = function includeMembers() {
    const [ first, second, ...args] = arguments;
    assert.apply(t, [_.difference(second, first).length === 0].concat(args));
  };

  assert.match = function match() {
    const [value, regex, ...args] = arguments;
    assert.apply(t, [regex.test(value)].concat(args));
  };

  return assert;
}
