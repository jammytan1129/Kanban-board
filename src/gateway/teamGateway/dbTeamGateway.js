const DomainGateway = require('../domainGateway');
const UserGateway = require('../userGateway/dbUserGateway');

const Team = require('../../model/team');
const User = require('../../model/user');

module.exports = class DBTeamGateway extends DomainGateway {
    constructor(database) {
        super(database);
    }

    loadDomainObjWithRow(row) {
        let team = new Team();
        team.setId(row.id);
        console.log(team.id());
        return team;
    }
  
    findSQL(id) {
        return `select * from team where id = ${id}`;
    }
  
    insertSQL(domainObj) {
        return `insert into team(id, create_at, update_at)  values(null, null, null)`;
    }
  
    updateSQL(domainObj) {
        //return `update todo set title = '${domainObj.title()}' where id = ${domainObj.id()}`;
    }
  
    deleteSQL(id) {
        return `delete from team where id = ${id}`;
    }
  
    clearAllSQL() {
        //return `delete from team`;
    }


    async find(id) {
        let team = await super.find(id);
        let userList = await this.loadUser(team);
        team.setUserList(userList);
        return team;
    }


    findUserSQL(teamId) {
        return `select usr.id, usr.email from user usr, teamUser tusr where tusr.teamId = ${teamId} and tusr.userId = usr.id`;
    }

    async loadUser(team) {
        let sql = this.findUserSQL(team.id());
        let rows = await this._database.query(sql);
        let userList = [];
        for (let i = 0; i < rows.length; i++)       
            userList.push(UserGateway.loadRow(rows[i]));
        return userList;
    }




    // need to move to the class which is relate to this responsibility
    insertUserToTeamSQL(userId, teamId) {
        return `INSERT INTO teamUser (teamId, userId) VALUES (${teamId}, ${userId});`;
    }

    async insertUserToTeam(userId, teamId) {
        //still need to check whther the user id and teamid is valid
        let sql = this.insertUserToTeamSQL(userId, teamId);
        try {
            let row = await this._database.query(sql);
            return row;
        } catch (err) {
            throw Error(err.message);
        }
    }

    changeUserTeamSQL(userId, modifiedTeamId, originalTeamId) {
        return `update teamUser set teamId = '${modifiedTeamId}' where userId = ${userId} and teamId = ${originalTeamId}`;
    }
    

    findUserTeamIdSQL(userId) {
        return `select teamId from teamUser where userId = ${userId}`;
    }

    async findUserTeamId(userId) {
        let sql = this.findUserTeamIdSQL(userId);
        let row = await this._database.query(sql);
        return row[0].teamId;
    }

    async changeUserTeam(userId, modifiedTeamId) {
        let originalTeamId = await this.findUserTeamId(userId);
        let sql = this.changeUserTeamSQL(userId, modifiedTeamId, originalTeamId);  
        let result = await this._database.query(sql);
        return result;
    }
};