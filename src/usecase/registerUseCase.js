const User = require('../model/user');

module.exports = class RegisterUseCase {
    constructor(userDataGateway) {
        this._userGateway = userDataGateway;
    }

    createUser(userStructure) {
        let user = new User();
        user.setEmail(userStructure.email);
        user.setPassword(userStructure.password);
        return user;
    }

    async registerUser(userStructure) {
        let user = this.createUser(userStructure);
        try {
            let insertedUser = await this._userGateway.insert(user);
            return insertedUser;
        } catch (err) {
            throw Error(err.message);
        }
    }
};