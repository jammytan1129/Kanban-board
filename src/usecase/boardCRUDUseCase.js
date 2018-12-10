
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
    
    async findBoardById(id) { // test
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

    // static async findBoardById(inputData) {
    //     try {
    //         let board = await Board.findOne({_id: inputData.id});
    //         return board;    
    //     } catch (err) {
    //         throw Error(err.message);
    //     }
    // }

    // static async fetchUserBoard(boardID_list) {
    //     let boards = await Board.find({}).where('_id').in(boardID_list).exec();
    //     return boards;
    // }
    
    // static async createBoard(initialData) {
    //     const userID = initialData.userID;
    //     const boardName = initialData.boardName;
        
    //     let board = new Board({
    //         name: boardName,
    //         members: [userID], // embeded
    //     });

    //     board = await board.save();
        
    //     let user = await RegisterUseCase.findUserById(userID);
        
    //     user.board_list.push(board._id);
    //     await user.save();
    //     return board;
    // }

    async addNewCard(data) {
        return await this._boardGateway.addNewCard(data.boardId, data.stage_index, data.cardTitle);
    }

    async addNewStage(data) { 
        const stage = await this._boardGateway.addNewStage(data.boardId, data.stageTitle);
        return stage;
    }

    async removeStage(data) {
        return await this._boardGateway.removeStage(data.boardId, data.stage_index);
    }

    async removeCard(data) {
        return await this._boardGateway.removeCard(data.boardId, data.stage_index, data.card_index);
    }
};




