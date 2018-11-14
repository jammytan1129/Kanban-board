module.exports = class Team {
    constructor() {
       this._userList = [];
       this._id;
    }  

    setId(id) {
        this._id = id;
    }

    id() {
        return this._id;
    }

    addUser(user) {
        this._userList.push(user);
    }

    getUserList() {
        return this._userList;
    }

    setUserList(userList) {
        this._userList = userList;
    }


};