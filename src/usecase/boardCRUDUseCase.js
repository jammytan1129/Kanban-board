
const Board = require('../mongoModel/board');
const RegisterUseCase = require('./registerUseCase');

module.exports = class BoardCRUDUseCase {

    static async findBoardById(inputData) {
        try {
            let board = await Board.findOne({_id: inputData.id});
            return board;    
        } catch (err) {
            throw Error(err.message);
        }
    }
    
    static async createBoard(initialData) {
        const userID = initialData.userID;
        const boardName = initialData.boardName;
        
        let board = new Board({
            name: boardName,
            members: [userID], // embeded
        });

        board = await board.save();
        
        let user = await RegisterUseCase.findUserById(userID);
        
        user.board_list.push(board._id);
        await user.save();
        return board;
    }
};




