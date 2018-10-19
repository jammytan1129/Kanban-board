var assert = require('assert');

const DBUserGateway = require('../gateway/userGateway/dbUserGateway');
const User = require('../model/user');

describe('TodoGateway', function() {
  
  let userGateway;
  let user;  
  beforeEach(function(done) {
    user = new User('my card');
    user.setEmail('gay88358@yahoo.com.tw');
    user.setPassword('1234');

    userGateway = new DBUserGateway();
    let result = userGateway.clearAll();

    result
    .then(cleanResult => {
        done();
    })
    .catch(err => console.log(err));
    

  });
  
  afterEach(function(done) {
    done();
  });
  
  describe('#TodoGateway', () => { 
      
    // it('insert a user', (done) => {
    //     let result = userGateway.insert(user);
    //     result.then(insertedUser => {
    //         console.log(insertedUser);
    //         done();
    //     });
    // });

    // it('find user with password and email', (done) => {
    //     let result = userGateway.insert(user);
    //     result
    //     .then(insertedUser => {
    //         return userGateway.find(insertedUser.email(), insertedUser.password());
    //     })
    //     .then(targetUser => {
    //         assert.equal(targetUser.email(), user.email());
    //         return userGateway.createComparePromise(user.password(), targetUser.password());
    //     })
    //     .then(isMatch => {
    //         assert.equal(isMatch, true);
    //         done();
    //     })
    // });

    // it('find user with id should throw exception', (done) => {
    //     let result = userGateway.find(-100);
    //     result
    //     .then(user => {
            
    //     })
    //     .catch(err => {
    //         //console.log(err);
    //         assert.equal(err, 'Error: method find with id can not invoked');
    //         done();
    //     }) 
    // });
    it('insert duplicate user', function(done) {
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            return userGateway.insert(user);
        })
        .catch(err => {
            console.log('er');
            done();
        })
    });

    it('find null user', function(done) {
        let result = userGateway.find('-12123', '1asdasd23');
        result.then(user => {
            assert.equal(user, null);
            done();
        });
    });



    it('hashing password', (done) => {
        let password = '1234';
        let result = userGateway.createHashPromise(password);
        result
        .then(hash => {
            console.log(hash);
            return userGateway.createComparePromise(password, hash);
        })
        .then(isMatch => {
            console.log('isMatch');
            assert.equal(isMatch, true);
            done();
        })
    });

    // it('update user', function(done) {
    //     let result = userGateway.insert(user);
    //     result
    //     .then(insertedUser => {
    //         insertedUser.setEmail('1234');
    //         return userGateway.update(insertedUser);
    //     })
    //     .then(updateResult => {
    //         assert.equal(updateResult.affectedRows, 1);
    //         done();
    //     })
    // });
    // it('update todo', function(done) {
    //   let result = todoGateway.insert(todo);
    //   result
    //   .then(insertedTodo => {
    //     insertedTodo.setTitle('update todo title');
    //     return todoGateway.update(insertedTodo);
    //   })
    //   .then(result => {
    //     return todoGateway.find(todo.id());
    //   })
    //   .then(finalItem => {
    //     assert.equal(finalItem.title(), todo.title());
    //     done();
    //   });
    // });
    
  })
  
});
