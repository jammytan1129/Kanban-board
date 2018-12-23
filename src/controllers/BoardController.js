const path = require('path');
const Board = require('../mongoModel/board');
const User = require('../mongoModel/user');
const UseCaseFactory = require('../factory/useCaseFactory');

module.exports = {
    /*
    {
        taskId,
        priority,
        boardFk
    }
    */
    async fetchBoardDataById(req, res) {
        try {
            let board = await UseCaseFactory.createBoardUseCase().findBoardById(req.body.id);            
            res.send(board);    
        } catch(err) {
            res.send(err.message);
        }
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
        let board = await Board.findOne({_id: req.body.boardId});
        let user = await User.findOne({_id: req.body.userId});
        board.members.push(user);
        board = await board.save();
        user.board_list.push({
            boardFk: board._id,
            name: board.name,            
        });
        await user.save();
        res.send(board);
    },
    async renderBoard(req, res) {
      let pagePath = path.join(__dirname, '../views/pages/layouts/board');
      res.render(pagePath);
    },
    async renderHome(req, res) {
        let pagePath = path.join(__dirname, '../views/pages/layouts/home');
        res.render(pagePath);
    },
    async createBoard(req, res) {
        const initialData = {
            userId: req.user._id,
            boardName: req.body.boardName,
            background_url: req.body.background_url
        };  
        let board = await UseCaseFactory.createBoardUseCase().createBoard(initialData);
        res.send(board);
    },
    async fetchUserBoards(req, res) {  
        const boardId_list = req.body.board_list.map(board => board._id);
        let boards = await UseCaseFactory.createBoardUseCase().findBoardsByIdList(boardId_list);
        res.send(boards);
    },
    async addNewCard(req, res) {
        const card = await UseCaseFactory.createBoardUseCase().addNewCard(req.body);
        res.send(card);
    },
    async addNewStage(req, res) {
        const stage = await UseCaseFactory.createBoardUseCase().addNewStage(req.body);
        res.send(stage);
    },
    async removeStage(req, res) {
        const stage_index = await UseCaseFactory.createBoardUseCase().removeStage(req.body);
        res.send(stage_index);
    },
    async removeCard(req, res) {
        const card_index = await UseCaseFactory.createBoardUseCase().removeCard(req.body);
        res.send(card_index);
    },
    async inviteUserToExistBoard(req, res) {
        try {
            const members = await UseCaseFactory.createBoardUseCase().inviteUserToExistBoard(req.body);
            res.send(members);
        } catch (err) {
            res.status(400).send({'error': err.message});
        }
    },
    async moveStage(req, res) {
        try {
            await UseCaseFactory.createBoardUseCase().moveStage(req.body);
            res.send('move stage successfully');
        } catch (err) {
            res.status(400).send({'error': err.message});
        }
    },
    async editStage(req, res) {
        try {
            const stage = await UseCaseFactory.createBoardUseCase().editStage(req.body);
            res.send(stage);
        } catch (err) {
            res.status(400).send({'error': err.message});
        }
    },
    async removeBoardMember(req, res) {
        try {
            const result = await UseCaseFactory.createBoardUseCase().removeMemberFromBoard(req.body);
            res.send(result);
        } catch (err) {
            res.status(400).send({'error': err.message});
        }
    }
}