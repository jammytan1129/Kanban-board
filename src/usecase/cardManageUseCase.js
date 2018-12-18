//const CardGateway = require('../gateway/card/cardGateway');
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

    async formatCardComment(comments) {
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
};




