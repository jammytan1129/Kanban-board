const Database = require('../db/db');
const UserGateway = require('./userGateway/dbUserGateway');
const TaskGateway = require('./taskGateway/dbTaskGateway');
const BoardGateway = require('./boardGateway/dbBoardGateway');
const ItemGateway = require('./itemGateway/dbItemGateway');
const TodoGateway = require('./todoGateway/dbTodoGateway');
const CardGateway = require('./cardGateway/dbCardGateway');

module.exports = class GatewayFactory {
    constructor() {
    }

    static createUserGateway() {
        return new UserGateway(new Database);
    }

    static createItemGateway() {
        return new ItemGateway(new Database);
    }

    static createBoardGateway() {
        return new BoardGateway(new Database);
    }

    static createTaskGateway() {
        return new TaskGateway(new Database);
    }

    static createCardGateway() {
        return new CardGateway(new Database);
    }

    static createTodoGateway() {
        return new TodoGateway(new Database);
    }
};