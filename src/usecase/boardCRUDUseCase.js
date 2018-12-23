
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
        const background_url = initialData.background_url;
        let board = await this._boardGateway.createBoard({userId, boardName, background_url});
        
        await this._userGateway.addBoardIdToUser(userId, board._id);
        return board;
    }

    async isUserAlreadyInTheBoard(boardId, userId) {
        const board = await this._boardGateway.findBoardById(boardId);
        const member = board.members.filter(m => m.userFk.toString() == userId.toString());
        const isUserInTheBoard = member.length > 0;
        return isUserInTheBoard;
    }

    // test
    async inviteUserToExistBoard(inputData) {
        const boardId = inputData.boardId;
        const email = inputData.email;

        const user = await this._userGateway.findUserByEmail(email);
        if (!user)
            return null;
        
        if (await this.isUserAlreadyInTheBoard(boardId, user._id))
            throw Error('invited user already in the board');
        
        await this._userGateway.addBoardIdToUser(user._id, boardId);
        await this._boardGateway.addNewMember(boardId, user._id);
        return user;
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
        const stage = await this._boardGateway.addNewStage(data.boardId, data.stageTitle, data.border_color);
        return stage;
    }

    async removeStage(data) {
        return await this._boardGateway.removeStage(data.boardId, data.stageId);
    }

    async removeCard(data) {
        return await this._boardGateway.removeCard(data.boardId, data.stage_index, data.cardId);
    }

    async moveStage(data) {
        const key = {
            boardId: data.boardId,
            stageId: data.stageId
        };

        const position = {
            start_stage_index: data.start_stage_index,
            end_stage_index: data.end_stage_index
        }
        return await this._boardGateway.moveStage(key, position);
    }

    async editStage(inputData) {
        /**
         * {
         *   boardId,
         *   stageId,
         *   WIP_limit,
         *   title,
         *   board_color
         * }
         */   
         return await this._boardGateway.editStage(inputData);
    }

    async removeMemberFromBoard(inputData) {
        /**
         * {
         *   boardId,
         *   userId
         * }
         */        
        await this._userGateway.removeBoardFromUser(inputData.userId, inputData.boardId);
        console.log('inputData');
        await this._boardGateway.removeMemberFromBoard(inputData.boardId, inputData.userId);
        return 'remove member successfully';
    }
};




