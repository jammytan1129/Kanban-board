var assert = require('assert');

const GatewayFactory = require('../gateway/gatewayFactory');

describe('Factory', function() {
  beforeEach(function() {
  });
  

  afterEach(function() {

  });
  
  describe('#factory', () => {
    // 測試算出來的平均是不是 2.5
    it('test factory constructor', function() {
        console.log(GatewayFactory.createUserGateway().constructor);
        console.log(GatewayFactory.createItemGateway().constructor);
        console.log(GatewayFactory.createTodoGateway().constructor);
        console.log(GatewayFactory.createCardGateway().constructor);
        console.log(GatewayFactory.createBoardGateway().constructor);
        console.log(GatewayFactory.createTaskGateway().constructor);
    });
  })  
});
