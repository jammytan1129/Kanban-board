const User = require('../../mongoModel/user');

module.exports = class UserGateway {
    constructor() {

    }

    async findUserById(id) {
        let user = await User.findOne({_id: id});
        return user;
    }

    async findUserByEmail(email) {
        let user = await User.findOne({email: email});
        return user;
    }

    async saveUser(userInfo) {
        let user = new User(userInfo);
        return await user.save();
    }

    async updateUser(userInfo) {
        return await User.updateOne({_id: userInfo._id}, userInfo);
    }

    async addBoardIdToUser(userId, boardId) {
        let user = await this.findUserById(userId);
        user.board_list.push({boardFk: boardId});
        return await user.save();
    }

    async findUsersByIdList(userIdList) {
        let users = await User.find({ _id: { $in: userIdList}});
        return users;
    }
}