
const Board = require('../mongoModel/board');
const RegisterUseCase = require('./registerUseCase');

module.exports = class BoardCRUDUseCase {
    async setBoardGateway(boardGateway) {
        this._boardGateway = boardGateway;
    }

    async setUserGateway(userGateway) {
        this._userGateway = userGateway;
    }

    async createBoard(initialData) {
        const userId = initialData.userId;
        const boardName = initialData.boardName;
        
        let board = await this._boardGateway.createBoard({userId, boardName});
        
        await this._userGateway.addBoardIdToUser(userId, board._id);
        return board;
    }
    // test
    async inviteUserToExistBoard(inputData) {
        const boardId = inputData.boardId;
        const email = inputData.email;

        const user = await this._userGateway.findUserByEmail(email);
        await this._userGateway.addBoardIdToUser(user._id, boardId);
        return await this._boardGateway.addNewMember(boardId, user._id);
    }

    async findBoardById(id) { 
        let board = await this._boardGateway.findBoardById(id);
        const memberIdList = board.members.map((member) => member.userFk);
        const memberList = await this._userGateway.findUsersByIdList(memberIdList);
        let boardObj = this.convertSchemaModelToPlain(board);
        boardObj.members = memberList;
        return boardObj;
    }

    convertSchemaModelToPlain(board) {
        return board.toObject();
    }

    async findBoardsByIdList(boardId_list) {
        let boards = await this._boardGateway.findBoardsByBoardIdList(boardId_list);
        return boards;
    }
    
    async addNewCard(data) {
        return await this._boardGateway.addNewCard(data.boardId, data.stage_index, data.cardTitle);
    }

    async addNewStage(data) { 
        const stage = await this._boardGateway.addNewStage(data.boardId, data.stageTitle);
        return stage;
    }

    async removeStage(data) {
        return await this._boardGateway.removeStage(data.boardId, data.stageId);
    }

    async removeCard(data) {
        return await this._boardGateway.removeCard(data.boardId, data.stage_index, data.cardId);
    }
};




