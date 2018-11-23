const User = require('../mongoModel/user');

module.exports = class UserUseCase {
    static async saveUserInfo(userInfo) {
        return await User.updateOne({_id: userInfo._id}, userInfo);
    }
};