const UserGateway = require('../gateway/user/userGateway');

module.exports = class CardManageUseCase {
    constructor() {
        this._userGateway = new UserGateway();
    }

    setCardGateway(cardGateway) {
        this._cardGateway = cardGateway;
    }

    async findCard(inputData) {
        const card = await this._cardGateway.findCard(inputData); 
        const plainCard = this.convertSchemaModelToPlain(card);
        plainCard.comments = await this.formatCardComment(card.comments);
        return plainCard;
    }

    convertSchemaModelToPlain(mongoseSchema) {
        return mongoseSchema.toObject();
    }

    async formatCardComment(comments) { // test
        // name: userName
        // time: user post time
        // text: user message
        // icon_url: user_icon
        const reverse = this.convertSchemaModelToPlain(comments.reverse());
        const memberIdList = reverse.map((comment)=> comment.userFk);
        const memberList = await this._userGateway.findUsersByIdList(memberIdList);
        reverse.forEach((comment) => {
            const member = memberList.find(member => member._id == comment.userFk);
            comment.name = member.name;
            comment.icon_url = member.icon_url;
        });
        return reverse;
    }

    async updateDescription(inputData) {
        const data = {
            boardId: inputData.boardId,
            stage_index: inputData.stage_index,
            cardId: inputData.cardId
        }
        return await this._cardGateway.updateDescription(data, inputData.description);
    }

    async leaveComment(inputData) {
        const data = {
            boardId: inputData.boardId,
            stage_index: inputData.stage_index,
            cardId: inputData.cardId
        }

        const commentData = {
            userFk: inputData.userId,
            text: inputData.text
        }
        
        return await this._cardGateway.leaveComment(data, commentData);
    }

    processEndPositionFormat(startPosition, endPosition) {
        if (endPosition.stage_index == -1)
            endPosition.stage_index = startPosition.stage_index;
    }

    // input: {cardLocation, start_position, end_position}
    async moveCardPosition(inputData) {
        const cardLocation = inputData.cardLocation;
        const start_position = inputData.start_position;
        const end_position = inputData.end_position;
        this.processEndPositionFormat(start_position, end_position);
        return await this._cardGateway.moveCardPosition(inputData.cardLocation, inputData.start_position, inputData.end_position);
    }

    async appendTagToCard(inputData) {
        return await this._cardGateway.appendTagToCard(inputData);
    }
    
    async assignMemberTocard(inputData) {
        return await this._cardGateway.assignMemberTocard(inputData);
    }

    async removeLabelFromCard(inputData) {
        return await this._cardGateway.removeLabelFromCard(inputData);
    }

    async removeAssignedMemberFromCard(input) {
        return await this._cardGateway.removeAssignedMemberFromCard(input);
    }
};




