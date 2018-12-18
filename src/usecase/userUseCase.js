const User = require('../mongoModel/user');

module.exports = class UserUseCase {

    setUserGateway(userGateway) {
        this._userGateway = userGateway;
    }

    async updateUser(userInfo) {
        return await this._userGateway.updateUser(userInfo);
    }

    static async saveUserInfo(userInfo) {
        return await User.updateOne({_id: userInfo._id}, userInfo);
    }
};



