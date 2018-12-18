const BoardGateway = require('../board/fakeBoardGateway');

module.exports = class CardGateway {
    constructor() {
        this._boardGateway = new BoardGateway;
    }
    /*
    *  
    */
    async findCard(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const work_item = board.stage_list[inputData.stage_index].work_items;
        const card = work_item.filter(work => work._id == inputData.cardId)
        return card[0];
    }

    async updateDescription(inputData, description) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);
        card.description = description;
        await this._boardGateway.updateBoard(board);
        return description;
    }

    async leaveComment(inputData, commentData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);
        card.comments.push({
            text: commentData.text
        });
        await this._boardGateway.updateBoard(board); 
        return card;     
    }
}


