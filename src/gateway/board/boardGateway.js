const Board = require('../../mongoModel/board');

module.exports = class BoardGateway {
    constructor() {

    }

    async findBoardById(id) {
        let board = await Board.findOne({_id: id});
        return board;
    }

    async findBoardsByBoardIdList(boardIdList) {
        let boards = await Board.find({ _id: { $in: boardIdList}})
        return boards;
    }

    async createBoard(inputData) {
        let board = new Board({
            name: inputData.boardName,
            members: [{
                userFk: inputData.userId
            }],
            stage_list: [
                {title: "Todo", WIP_limit: 0},
                {title: "In progress", WIP_limit: 0},
                {title: "Done", WIP_limit: 0}
            ]
        })
        return await board.save();
    }

    async addNewStage(boardId, stageTitle) {
        let board = await this.findBoardById(boardId);
        board.stage_list.push({
            title: stageTitle
        });
        board = await board.save();
        return board.stage_list[board.stage_list.length - 1];
    }

    async removeStage(boardId, stage_index) {
        let board = await this.findBoardById(boardId);
        board.stage_list.splice(stage_index, 1);
        await board.save();
        return stage_index;
    }

    async addNewCard(boardId, stage_index, cardTitle) {
        let board = await this.findBoardById(boardId);
        board.stage_list[stage_index].work_items.push({
            title: cardTitle
        });
        await board.save();
        const numOfCard = board.stage_list[stage_index].work_items.length;
        return board.stage_list[stage_index].work_items[numOfCard - 1];
    }

    async removeCard(boardId, stage_index, card_index) {
        let board = await this.findBoardById(boardId);
        board.stage_list[stage_index].work_items.splice(card_index, 1);
        await board.save();
        return card_index;
    }
}


