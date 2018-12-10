
module.exports = class FakeUserGateway {
    constructor() {
        this._hash = {};
        this._index = 0;
        this.initializeFakeData();
    }

    initializeFakeData() {
        this._hash[this._index++] = {
            name: 'Z-Xuan Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781',
            board_list: []
        };
    }

    async findUserById(id) {
        return this._hash[id];
    }

    async findUserByEmail(email) {
        for (let i = 0; i < this._index; i++) {
            if (this._hash[i].email == email) {
                return this._hash[i];
            }
        }
    }

    async saveUser(userInfo) {
        this._hash[this._index++] = userInfo;
        return userInfo;
    }

    async updateUser(userInfo) {
        this._hash[userInfo._id] = userInfo;
        return 'update success';
    }

    async addBoardIdToUser(userId, boardId) {
        let user = await this.findUserById(userId);
        user.board_list.push(boardId);
        return user;
    }

    async findUsersByIdList(userIdList) {
        let userList = [];
        for (let i = 0; i < userIdList.length; i++) {
            userList.push(await this.findUserById(userIdList[i]));
        }
        return userList;
    }
}