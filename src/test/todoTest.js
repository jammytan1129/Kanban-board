var assert = require('assert');
//Each task shall have attributes, 
// such as ID, name, type 
// (e.g., feature, doc, bug, support, ..., etc), 
// description, version, priority, status (i.e., state), 
// handlers, estimated effort (i.e., story point), 
// actual effort, timestamp for each state change (or start/due time), 
// tag, attachment file, etc.
const Todo = require('../model/todo');
const Item = require('../model/item');

describe('Todo', function() {
  var todo;
  var title = 'name';
  var item1;
  var item2;
  var item3;
  beforeEach(function() {
    todo = new Todo(title);
    initializeItem();
  });

  function initializeItem() {
    item1 = new Item('do something1...');
    item2 = new Item('do something2...');
    item3 = new Item('do something3...');
    todo.addItem(item1);
    todo.addItem(item2);
    todo.addItem(item3);
  }
  
  afterEach(function() {
  });
  
  describe('#todo', () => {
    it('test todo constructor', function() {
      assert.equal(todo.title(), title);
    });
  
    it('test set title of the card', function() {
      var myTitle = 'title test';
      todo.setTitle(myTitle);
      assert.equal(todo.title(), myTitle);
    });

    it('test to do add item', function() {
      assert.equal(todo.itemSize(), 3);
      var result = [item1, item2, item3];
      for (var i = 0; i < todo.itemSize(); i++)
        assert.equal(todo.getItemByIndex(i), result[i]);
    });

    it('test mark item done', function() {
      todo.markItemDoneByIndex(0);
      var item = todo.getItemByIndex(0);
      assert.equal(item.isDone(), true);
    });

    it('test id setter and getter', function() {
      var id = 12;
      todo.setId(id);
      assert.equal(id, todo.id());
    });

    it('test getCompleteItemCount', function() {
      assert.equal(todo.getCompleteItemCount(), 0);
      todo.markItemDoneByIndex(0);
      assert.equal(todo.getCompleteItemCount(), 1);
      todo.markItemDoneByIndex(1);
      assert.equal(todo.getCompleteItemCount(), 2);
    });

    function result(todo) {
      return todo.getCompleteItemCount() / todo.itemSize();
    }

    it('test calculate todo completion percentage', function() {
      assert.equal(todo.calculateCompletePercentage(), 0);
      todo.markItemDoneByIndex(0);
      assert.equal(todo.calculateCompletePercentage(), result(todo));
      todo.markItemDoneByIndex(1);
      assert.equal(todo.calculateCompletePercentage(), result(todo));
      todo.markItemDoneByIndex(2);
      assert.equal(todo.calculateCompletePercentage(), result(todo));
    });

    it('test calculate todo completion zero', function() {
      let zeroItemTodo = new Todo('this is zero todo');
      assert.equal(todo.calculateCompletePercentage(), 0);
    });

    it('test todo getItemListSize', function() {
      assert.equal(todo.getItemListSize(), 3);
    });

    it('test todo set itemList', function() {
      assert.equal(todo.getItemListSize(), 3);
      todo.setItemList([new Item('123')]);
      assert.equal(todo.getItemListSize(), 1);
    });
  })
  
});
