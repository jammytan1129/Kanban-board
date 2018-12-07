const Board = require('../../mongoModel/board');

module.exports = class BoardGateway {
    constructor() {

    }

    async findBoardById(id) {
        let board = await Board.findOne({_id: id});
        return board;
    }
    // boardGateway findboardsByBoardIdList has some syntax bug...
    async findBoardsByBoardIdList(boardIdList) {
        let boards = await Board.find({ _id: { $in: boardIdList}})
        return boards;
    }

    async createBoard(inputData) {
        let board = new Board({
            name: inputData.boardName,
            members: [{
                userFk: inputData.userId
            }]
        })
        return await board.save();
    }
}