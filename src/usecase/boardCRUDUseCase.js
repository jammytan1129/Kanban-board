
const GatewayFactory = require('../gateway/gatewayFactory');

module.exports = class TaskCRUDUseCase {
    constructor(boardGateway) {
        this._boardGateway = boardGateway;
    }
    /*
    {
        taskId,
        priority,
        boardFk
    }
    */
    async changeTaskPriority(inputData) {
        let boardFk = inputData.boardFk;
        let taskId = inputData.taskId;
        let priority = inputData.priority;
        
        let board = await this._boardGateway.find(boardFk);
        board.changeTaskPriority(taskId, priority);
        await this._boardGateway.save(board);
        return board;
    }
};