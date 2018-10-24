var assert = require('assert');
const DomainGateway = require('../gateway/fakeGateway');
const Item = require('../model/item');

describe('TodoGateway', function() {
  
  let domainGateway;
  let domainObj;
  beforeEach(function(done) {
    domainObj = new Item('this is a test');
    domainGateway = new DomainGateway();
    done();
  });
  
  afterEach(function(done) {
    done();
  });
  
  describe('#fakeGateway', () => {    
    it('insert', (done) => {
        let result = domainGateway.insert(domainObj);
        result.then(insertedItem => {
            return domainGateway.find(insertedItem.id());
        })
        .then(targetItem => {
            assert.equal(targetItem.id(), domainObj.id());
            assert.equal(targetItem.content(), domainObj.content());
            done();
        })
    });

    it('update', (done) => {
        let result = domainGateway.insert(domainObj);
        result.then(insertedItem => {
            insertedItem.setContent('fuck');
            insertedItem.setIsDone(1);
            return domainGateway.update(insertedItem);
        })
        .then(updateResult => {
            return domainGateway.find(domainObj.id());
        })
        .then(finalItem => {
            assert.equal(finalItem.content(), 'fuck');
            assert.equal(finalItem.isDone(), 1);
            done();
        });
    })
    
    it('delete', (done) => {
        let result = domainGateway.insert(domainObj);
        result.then(insertedItem => {
            return domainGateway.delete(insertedItem.id());
        })
        .then(deleteResult => {
            return domainGateway.find(domainObj.id());
        })    
        .then(finalItem => {
            assert.equal(finalItem, null);
            done();
        });
    });
  })
});
