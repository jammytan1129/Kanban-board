
module.exports = class FakeBoardGateway {
    constructor() {
        this._hash = {};
        this._index = 0;
        this.initializeFakeData();
    }

    initializeFakeData() {
        for (let i = 0; i < 5; i++) {
            this._hash[this._index++] = {
                _id: i,
                name: 'title',
                background_url: 'https://google.com.tw',
            };    
        }
    }

    async findBoardById(id) {
        return this._hash[id];
    }


    async saveBoard(boardInfo) {
        boardInfo._id = this._index;
        this._hash[this._index++] = boardInfo;
        return boardInfo;
    }

    async updateBoard(userInfo) {
        this._hash[userInfo._id] = userInfo;
        return 'update success';
    }

    isBoardInHash(id) {
        return this._hash[id];
    }

    async findBoardsByBoardIdList(boardIdList) {
        let board_list = [];
        for (let i = 0; i < boardIdList.length; i++) {
            if (this.isBoardInHash(boardIdList[i]))
                board_list.push(this._hash[boardIdList[i]]);
        }
        return board_list;
    }

    async createBoard(inputData) {
        const userID = inputData.userId;
        const boardName = inputData.boardName;
        
        let board = {
            name: boardName,
            members: [userID], // embeded
        };
        board = this.saveBoard(board);
        return board;
    }
}