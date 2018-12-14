const Board = require('../mongoModel/board');
const User = require('../mongoModel/user');
const UseCaseFactory = require('../factory/useCaseFactory');

module.exports = {
    /** 
     * {
     *   boardId,
     *   stage_index,
     *   cardId
     * }
     * 
     * 
    */
    // async fetchCardData(req, res) {
    //     try {
    //         const card = await UseCaseFactory.createCardUseCase().findCard(req.body.boardId, req.body.stage_index, req.body.cardId);
    //         res.send(card);
    //     } catch(err) {
    //         res.status(400).send({'error': err.message});
    //     }
    // },
    async updateDescription(req, res) {
        try {
            const result = await UseCaseFactory.createCardUseCase().updateDescription(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async leaveComment(req, res) {
        try {
            req.body.userId = req.user._id;
            const result = await UseCaseFactory.createCardUseCase().leaveComment(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    }
}