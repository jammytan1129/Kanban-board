const Board = require('../../mongoModel/board');

module.exports = class BoardGateway {
    constructor() {

    }

    async findBoardById(id) {
        const board = await Board.findOne({_id: id});
        if (board == null)
            throw Error('Board Not Found');      
        return board;
    }

    async findBoardsByBoardIdList(boardIdList) {
        let boards = await Board.find({ _id: { $in: boardIdList}})
        return boards;
    }

    async createBoard(inputData) {
        let board = new Board({
            name: inputData.boardName,
            background_url: inputData.background_url,
            members: [{
                userFk: inputData.userId
            }],
            stage_list: [
                {title: "Todo", WIP_limit: 0, border_color: '#FF0000'},
                {title: "In progress", WIP_limit: 0, border_color: '#FF8800'},
                {title: "Done", WIP_limit: 0, border_color: '#FFFF00'}
            ]
        })
        
        return await board.save();
    }

    async addNewStage(boardId, stageTitle, border_color) {
        let board = await this.findBoardById(boardId);
        board.stage_list.push({
            title: stageTitle,
            border_color: border_color 
        });
        board = await board.save();
        return board.stage_list[board.stage_list.length - 1];
    }

    async removeStage(boardId, stageId) {
        await Board.updateOne({_id: boardId}, { $pull: { "stage_list": {"_id": stageId}} });
        return stageId;
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

    async removeCard(boardId, stage_index, cardId) {
        const queryKey = `stage_list.${stage_index}.work_items`;
        const pullStatement = {};
        pullStatement[queryKey] = {"_id": cardId};
        await Board.updateOne({_id: boardId}, { $pull: pullStatement });
        return cardId;
    }   


    async addNewMember(boardId, userId) {
        let board = await this.findBoardById(boardId);
        board.members.push({
            userFk: userId,
        });
        await board.save();
        return board.members;
    }

    removeByIndex(board, index) {
        board.stage_list.splice(index, 1);
    }

    insertByIndex(board, index, stage) {
        board.stage_list.splice(index, 0, stage);
    }

    async moveStage(key, position) {
        let board = await this.findBoardById(key.boardId);
        let stage = board.stage_list[position.start_stage_index];
        this.removeByIndex(board, position.start_stage_index);
        this.insertByIndex(board, position.end_stage_index, stage);
        await board.save();
    }

    async findStage(inputData) {
        const board = await this.findBoardById(inputData.boardId);
        let stage = board.stage_list.filter(stage => stage._id.toString() == inputData.stageId.toString());
        return stage[0];
    }

    async extractStageFromBoard(board, inputData) {
        return board.stage_list.filter(stage => stage._id.toString() == inputData.stageId.toString())[0];
    }

    async editStage(data) {
        let board = await this.findBoardById(data.boardId);
        let stage = await this.extractStageFromBoard(board, data);
        if (data.WIP_limit)
            stage.WIP_limit = data.WIP_limit;
        if (data.title)
            stage.title = data.title;
        if (data.border_color)
            stage.border_color = data.border_color;
        await board.save();
        return stage;
    }

    findMemberIndexById(board, userId) {
        for (let i = 0; i < board.members.length; i++) 
            if (board.members[i].userFk == userId)
                return i;
        return -1;
    }

    async removeMemberFromBoard(boardId, userId) { // test
        const board = await this.findBoardById(boardId);
        const removedIndex = this.findMemberIndexById(board, userId);
        if (removedIndex == -1)
            throw Error('board member is not found');
        board.members.splice(removedIndex, 1);
        await board.save(); 
        return 'remove member from board successfully';
    } 
}


