var assert = require('assert');

const Team = require('../model/team');
const User = require('../model/user');

describe('Team', function() {
  let team;
  beforeEach(function() {
      team = new Team();
  });
  
  afterEach(function() {
  });
  
  describe('#Team', () => {
    it('test team add user', function() {
        team.addUser(new User);
        team.addUser(new User);
        team.addUser(new User);
        team.addUser(new User);
        
        let userList = team.getUserList();
        assert.equal(userList.length,4);
    });

    it('test team set userList', function() {
        let userList = team.getUserList();
        assert.equal(userList.length, 0);

        team.setUserList([new User]);

        userList = team.getUserList();
        assert.equal(userList.length, 1);        
    })

    it('test team filed setter and getter', function() {
        team.setId(23);
        assert.equal(team.id(), 23);
    })
  });  
  
});
