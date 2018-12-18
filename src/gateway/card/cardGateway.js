const BoardGateway = require('../board/boardGateway');

module.exports = class CardGateway {
    constructor() {
        this._boardGateway = new BoardGateway();
    }

    async findCard(inputData) {
        let board = await this._boardGateway.findBoardById(inputData.boardId);
        return this.extractCardFromBoard(board, inputData);
    }

    async updateDescription(inputData, description) {
        let board = await this._boardGateway.findBoardById(inputData.boardId);
        let card = this.extractCardFromBoard(board, inputData);
        card.description = description;
        await board.save();
        return card;
    }

    async leaveComment(inputData, commentData) {
        let board = await this._boardGateway.findBoardById(inputData.boardId);

        let card = this.extractCardFromBoard(board, inputData);
        
        const datetime = new Date();
        card.comments.push({
            userFk: commentData.userFk,
            text: commentData.text,
            date: datetime
        })
        await board.save();
        return board;
    }

    extractCardFromBoard(board, inputData) {
        let cardList = board.stage_list[inputData.stage_index].work_items;
        let card = cardList.filter(card => card._id == inputData.cardId);
        return card[0];
    }
}


