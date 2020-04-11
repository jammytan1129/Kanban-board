const User = require('../../mongoModel/user');

module.exports = class UserGateway {
    constructor() {

    }

    async findUserByLikeEmail(email) {
        const user = await User.find({email: new RegExp(email, 'i') });
        return user;
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

    findBoardIndexById(user, boardId) {
        for (let i = 0; i < user.board_list.length; i++) 
            if (user.board_list[i].boardFk == boardId)
                return i;
        return -1;
    }
    // need to test
    async removeBoardFromUser(id, boardId) {
        const user = await this.findUserById(id);
        const removedIndex = this.findBoardIndexById(user, boardId);
        if (removedIndex == -1)
            throw Error('user is not in the board');
        user.board_list.splice(removedIndex, 1);        
        await user.save();
        return 'remove board from user successfully';
    }
}