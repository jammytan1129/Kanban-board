var assert = require('assert');

const DBTeamGateway = require('../gateway/teamGateway/dbTeamGateway');
const Database = require('../db/db');
const Team =  require('../model/team');

describe('TeamGateway', function() {
  let teamGateway;
  let team;

  beforeEach(function(done) {
    teamGateway = new DBTeamGateway(new Database);
    team = new Team();

    let result = teamGateway.connection();
    result.then(threadId => {
        done();
    })
  });
  
  afterEach(function(done) {
    let result = teamGateway.close();
    result.then(closeResult => {
        done();
    })
  });
  
  describe('#TeamGateway', () => {    
    it('find team', function(done) {
      let teamId = 1;
      let result = teamGateway.find(teamId);
      result.then(team => {
          console.log(team);
          done();
      })  
    });

    // it('insert team', function(done) {
    //   let result = teamGateway.insert(team);
    //   result.then(insertedTeam => {
    //       console.log(insertedTeam);
    //       done();
    //   })
    // });

    // it('delete team', function(done) {
    //     let result = teamGateway.insert(team);
    //     result
    //     .then(insertedTeam => {
    //         return teamGateway.delete(insertedTeam.id());
    //     })
    //     .then(deleteResult => {
    //         assert.equal(deleteResult.affectedRows, 1);
    //         done();
    //     })
    // });
    
    // it('insert user to team', function(done) {
    //     let userId = 99;
    //     let teamId = 1;
    //     let result = teamGateway.insertUserToTeam(userId, teamId);
    //     result.then(insertResult => {
    //         console.log(insertResult);
    //         done();
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //         done();
    //     });
    // });

    it('test find teamId to which the user belong', function(done) {
        let userId = 99;
        let result = teamGateway.findUserTeamId(userId);
        result.then(teamdId => {
            console.log(teamdId);
            assert.equal(teamdId, 1)
            done();
        })
    });

    it('test change teamId to which the user belong', function(done) {
        let userId = 99;
        let teamId = 3;
        let result = teamGateway.changeUserTeam(userId, teamId);
        result.then(result => {
            return teamGateway.findUserTeamId(userId);
        }) 
        .then(teamId => {
            assert.equal(teamId, 3);
            done();
        })
        
    }); 
  })
  
});
