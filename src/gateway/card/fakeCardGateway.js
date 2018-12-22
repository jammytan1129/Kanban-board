const BoardGateway = require('../board/fakeBoardGateway');

module.exports = class CardGateway {
    constructor() {
        this._boardGateway = new BoardGateway;
    }

    setBoardGateway(boardGateway) {
        this._boardGateway = boardGateway;
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
        const card = await this.findCard(cardLocation);
        const start_work_items = this.fetchWorkItemFromBoard(board, start_position);
        this.removeByIndex(start_work_items, start_position.card_index);

        const end_work_items = this.fetchWorkItemFromBoard(board, end_position);
        this.insertByIndex(end_work_items, card, end_position.card_index);
        
        await this._boardGateway.updateBoard(board);
    }

    async appendTagToCard(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);
        card.tags.push({
            color: inputData.color,
            text: inputData.text,
            _id: 0
        });
        await this._boardGateway.updateBoard(board);
        return 'append tag to card successfully';
    }

    async assignMemberTocard(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);

        card.assign.push({
            userFk: inputData.userId
        });
        await this._boardGateway.updateBoard(board);
        return 'assign member to card successfully';
    }

    async removeLabelFromCard(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);
        let removedIndex;
        for (let i = 0; i < card.tags.length; i++)
            if (card.tags[i]._id == inputData.labelId)
                removedIndex = i
        this.removeByIndex(card.tags, removedIndex);
        await this._boardGateway.updateBoard(board);
    }

    async removeAssignedMemberFromCard(inputData) {
        const board = await this._boardGateway.findBoardById(inputData.boardId);
        const card = await this.findCard(inputData);
        let removedIndex;
        for (let i = 0; i < card.assign.length; i++)
            if (card.assign[i].userFk == inputData.userId)
                removedIndex = i
        
        this.removeByIndex(card.assign, removedIndex);
        await this._boardGateway.updateBoard(board);
    }
}


