var test = require('test');
test.setup();
var config = require('./')

describe("fiw-config", () => {

  it('test config', () => {
    var test = config('./test/test.json');
    assert.equal(test.test, 123);
    assert.equal(test.str, "12313");
    assert.equal(test.parent.child, "abc");
    assert.equal(test.array[0], "x");
    assert.equal(test.array[1], "y");
  })

  it('test config base', () => {
    var test = config({base: './test'})('test');
    assert.equal(test.test, 123);
    assert.equal(test.str, "12313");
    assert.equal(test.parent.child, "abc");
    assert.equal(test.array[0], "x");
    assert.equal(test.array[1], "y");
  })

  it('test config readme', () => {
    var cs = config({base: 'test'});
    var conf = cs('test');
    assert.equal(conf.array[1], "y");
  })

})

test.run(console.DEBUG);