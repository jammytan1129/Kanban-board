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
    },
    async findCard(req, res) {
        try {
            const card = await UseCaseFactory.createCardUseCase().findCard(req.body);
            res.send(card);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async moveCardPosition(req, res) {
        const cardLocation = {
            boardId: req.body.boardId,
            stage_index: req.body.stage_index,
            cardId: req.body.cardId
        }

        const start_position = {
            stage_index: req.body.start_stage_index,
            card_index: req.body.start_card_index
        };


        const end_position = {
            stage_index: req.body.end_stage_index,
            card_index: req.body.end_card_index
        };
        try {
            await UseCaseFactory.createCardUseCase().moveCardPosition({cardLocation, start_position, end_position});
            res.send('move card successfully');
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async appendTagToCard(req, res) {
        try {
            const result = await UseCaseFactory.createCardUseCase().appendTagToCard(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async assignMemberToCard(req, res) {
        try {
            const result = await UseCaseFactory.createCardUseCase().assignMemberTocard(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async removeLabelFromCard(req, res) {
        try {
            const result = await UseCaseFactory.createCardUseCase().removeLabelFromCard(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    },
    async removeAssignedMemberFromCard(req, res) {
        try {
            const result = await UseCaseFactory.createCardUseCase().removeAssignedMemberFromCard(req.body);
            res.send(result);
        } catch(err) {
            res.status(400).send({'error': err.message});
        }
    }
}