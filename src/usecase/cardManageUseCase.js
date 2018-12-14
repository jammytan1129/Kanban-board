
const Board = require('../mongoModel/board');
const BoardGateway = require('../gateway/board/boardGateway');

module.exports = class CardManageUseCase {
    constructor() {
        this._boardGateway = new BoardGateway;
    }

    async findCard(board, stage_index, cardId) {
        // const board = await this._boardGateway.findBoardById(boardId);
        const work_item = board.stage_list[stage_index].work_items
        const card = work_item.filter(item => item._id == cardId);
        if (card.length == 0)
            throw Error('Work_Item Not Found');
        return card[0];
    }    



    async updateDescription(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(board, inputData.stage_index, inputData.cardId);
        card.description = inputData.description;        
        await board.save();
        return "update desciption successfully";
    }

    async leaveComment(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(board, inputData.stage_index, inputData.cardId);
        const datetime = new Date();
    
        card.comments.push({
            userFk: inputData.userId,
            text: inputData.text,
            date: datetime
        })        
        await board.save();
        return board;
    }
};




