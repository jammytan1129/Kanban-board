const GatewayFactory = require('../gateway/gatewayFactory');
const BoardCRUDUseCase = require('../usecase/boardCRUDUseCase');

const Board = require('../mongoModel/board');
const User = require('../mongoModel/user');

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
    },
    async myBoard(req, res) {
        let board = await Board.findOne({_id: req.body.id});
        res.send(board);
    },
    async insertNewStage(req, res) {
        let board = await Board.findOne({_id: req.body.id});
        board.stage_list.push({
            title: req.body.title,
            WIP_limit: 0,
        });
        let newBoard = await board.save();
        res.send(newBoard);
    },
    async insertNewCardToStage(req, res) {
        let board = await Board.findOne({'stage_list': { $elemMatch: { _id: req.body.id }}}, { 'stage_list.work_items.$': 1 })
        board.stage_list[0].work_items.push({
            title: req.body.title
        })
        board = await board.save();
        res.send(board);
    },
    async addNewMember(req, res) {
        console.log(req.body);

        let board = await Board.findOne({_id: req.body.boardId});
        let user = await User.findOne({_id: req.body.userId});
        board.members.push(user);
        board = await board.save();
        user.board_list.push({
            boardFk: board._id,
            name: board.name,            
        });
        await user.save();
        //board.members.push();
        res.send(board);
    }
}