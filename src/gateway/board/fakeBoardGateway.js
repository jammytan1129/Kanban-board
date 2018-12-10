
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
                members: [{
                    userFk: 0
                }],
                stage_list: [{title: 'bitch', work_items: [{title: 'card'}]}, {title: 'fucker', work_items: [{title: 'b card'}]}]
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

    async addNewStage(boardId, stageTitle) {
        
        let board = await this.findBoardById(boardId);

        board.stage_list.push({
             title: stageTitle
        });

        await this.updateBoard(board);
        return board.stage_list[board.stage_list.length - 1];
    }

    async removeStage(boardId, stage_index) {
        let board = await this.findBoardById(boardId);
        board.stage_list.splice(stage_index, 1);
        await this.updateBoard(board);
        return stage_index;
    }

    async addNewCard(boardId, stage_index, cardTitle) {
        let board = await this.findBoardById(boardId);
        board.stage_list[stage_index].work_items.push({
            title: cardTitle
        });
        await this.updateBoard(board);
        return board.stage_list[stage_index].work_items[board.stage_list[stage_index].work_items.length - 1];
    }

    async removeCard(boardId, stage_index, card_index) {
        let board = await this.findBoardById(boardId);
        board.stage_list[stage_index].work_items.splice(card_index, 1);
        await this.updateBoard(board);
        return card_index;
    }
}