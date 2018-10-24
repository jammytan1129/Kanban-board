var assert = require('assert');
const DomainGateway = require('../gateway/domainGateway');
const Database = require('../db/db');
describe('TodoGateway', function() {
  
  let domainGateway;
  
  beforeEach(function(done) {
    domainGateway = new DomainGateway(new Database);
    let result = domainGateway.connection();
    result.then(threadId => {
        console.log('connection: ' + threadId);
        done();
    })
  });
  
  afterEach(function(done) {
    let result = domainGateway.close();
    result.then(closeResult => {
        console.log(closeResult + 'database');
        done();
    })
  });
  
  describe('#Database', () => {    
    it('test connection in the setUp and close in the teardown', (done) => {
        done();
    });
     
  })
});
