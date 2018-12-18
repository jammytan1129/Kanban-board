const BoardCRUDUseCase = require('../usecase/boardCRUDUseCase');
const UserUseCase = require('../usecase/userUseCase');
const RegisterUseCase = require('../usecase/registerUseCase');
const CardManageUseCase = require('../usecase/cardManageUseCase');

const UserGateway = require('../gateway/user/userGateway');
const BoardGateway = require('../gateway/board/boardGateway');
const CardGateway = require('../gateway/card/cardGateway');

module.exports = class UseCaseFactory {
    static createUserUseCase() {
        let userUseCase = new UserUseCase();
        userUseCase.setUserGateway(new UserGateway())
        return userUseCase;
    }

    static createBoardUseCase() {
        let boardCRUDUseCase = new BoardCRUDUseCase();
        boardCRUDUseCase.setBoardGateway(new BoardGateway());
        boardCRUDUseCase.setUserGateway(new UserGateway());
        return boardCRUDUseCase;
    }

    static createRegisterUseCase() {
        let registerUseCase = new RegisterUseCase();
        registerUseCase.setUserGateway(new UserGateway())
        return registerUseCase;
    }

    static createCardUseCase() {
        let cardManageUseCase = new CardManageUseCase();
        cardManageUseCase.setCardGateway(new CardGateway);
        return cardManageUseCase;
    }
};




