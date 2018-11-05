const GatewayFactory = require('../gateway/gatewayFactory');
const BoardCRUDUseCase = require('../usecase/boardCRUDUseCase');

module.exports = {
    /*
    {
        taskId,
        priority,
        boardFk
    }
    */
    async changeTaskPriority(req, res) {
        let boardCRUDUseCase = new BoardCRUDUseCase(GatewayFactory.createBoardGateway());
        let board = await boardCRUDUseCase.changeTaskPriority(req.body);
        res.send(board);
    }
}