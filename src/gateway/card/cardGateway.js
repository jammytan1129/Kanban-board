const BoardGateway = require('../board/boardGateway');

module.exports = class CardGateway {
    constructor() {
        this._boardGateway = new BoardGateway();
    }

    setBoardGateway(boardGateway) {
        this._boardGateway = boardGateway;
    }

    async findCard(inputData) {
        let board = await this._boardGateway.findBoardById(inputData.boardId);
        return this.extractCardFromBoard(board, inputData);
    }

    extractCardFromBoard(board, inputData) {
        let cardList = board.stage_list[inputData.stage_index].work_items;
        let card = cardList.filter(card => card._id.toString() == inputData.cardId.toString());
        return card[0];
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

    fetchWorkItemFromBoard(board, position) {
        return board.stage_list[position.stage_index].work_items;
    }

    removeByIndex(workItems, index) {
        workItems.splice(index, 1);
    }

    insertByIndex(workItems, item, index) {
        workItems.splice(index, 0, item);
    }

    async moveCardPosition(cardLocation, start_position, end_position) {
        const board = await this._boardGateway.findBoardById(cardLocation.boardId);
        const move_card = await this.findCard(cardLocation);
        const start_work_items = this.fetchWorkItemFromBoard(board, start_position);
        this.removeByIndex(start_work_items, start_position.card_index);

        const end_work_items = this.fetchWorkItemFromBoard(board, end_position);
        this.insertByIndex(end_work_items, move_card, end_position.card_index);
        
        await board.save();
    }
}


