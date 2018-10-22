const DomainGateway = require('../domainGateway');
const DBTaskGateway = require('../taskGateway/dbTaskGateway');
const Board = require('../../model/board');
module.exports = class DBBoardGateway extends DomainGateway {
    constructor() {
        super();
        this._taskGateway = new DBTaskGateway();
    }

    findSQL(id) {
        return `select * from board where id = ${id}`;
    }

    insertSQL(domainObj) {
        return `INSERT INTO board (id, board_name) VALUES (NULL, '${domainObj.boardName()}')`;
    }
  
    updateSQL(domainObj) {
        return `update board set board_name = '${domainObj.boardName()}' where id = ${domainObj.id()}`;
    }
  
    deleteSQL(id) {
        return `delete from board where id = ${id}`;
    }
  
    clearAllSQL() {
        return `delete from board`;
    }

    loadDomainObjWithRow(row) {
        let board = new Board(row.board_name);
        board.setId(row.id);
        return board;
    }

    
    async find(id) {
        let board = await super.find(id);
        if (board == null)
            return null;
        
        let taskList = await this._taskGateway.loadTaskFor(board);
        board.setTaskList(taskList);
        return board;
    }
};