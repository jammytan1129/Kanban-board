
const Board = require('../mongoModel/board');

module.exports = class BoardCRUDUseCase {

    static async findBoardById(inputData) {
        try {
            let board = await Board.findOne({_id: inputData.id});
            return board;    
        } catch (err) {
            throw Error(err.message);
        }
    }
    /*
    {
        taskId,
        priority,
        boardFk
    }
    */
};




