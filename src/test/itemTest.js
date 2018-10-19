var assert = require('assert');
//Each task shall have attributes, 
// such as ID, name, type 
// (e.g., feature, doc, bug, support, ..., etc), 
// description, version, priority, status (i.e., state), 
// handlers, estimated effort (i.e., story point), 
// actual effort, timestamp for each state change (or start/due time), 
// tag, attachment file, etc.
const Item = require('../model/item')
describe('Card', function() {
  var item;
  var content = 'this is used to check content';
  beforeEach(function() {
    item = new Item(content);
    console.log('global setup');
  });
  
  afterEach(function() {
    console.log('global teardown');
  });
  
  describe('#item', () => {
    it('test item constructor', function() {
      assert.equal(item.content(), content);
      assert.equal(item.isDone(), false);
      item.markDone();
    });

    it('test item setContent', function() {
      item.setContent('test');
      assert.equal(item.content(), 'test');
    });

    it('set markDone', function() {
      assert.equal(item.isDone(), false);
      item.markDone();
      assert.equal(item.isDone(), true);
    });

    it('set IsDone', function() {
      item.markDone();
      assert.equal(item.isDone(), true);
      item.cancelDone();
      assert.equal(item.isDone(), false);
    });

  })

  // describe('#item state', ()=> {
  //   it('set isDone', function() {
  //     assert.equal(item.isDone(), false);
  //     item.markDone();
  //     assert.equal(item.isDone(), true);
  //   });
  
  // })
  
});
