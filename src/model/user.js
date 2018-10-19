module.exports = class User {
    constructor() {
        this._id;
        this._email;
        this._password
    }

    setPassword(password) {
        this._password = password;
    }
    
    password() {
        return this._password;
    }

    setId(id) {
        this._id = id;
    }

    id() {
        return this._id;
    }

    email() {
        return this._email;
    }

    setEmail(email) {
        this._email = email;
    }
};