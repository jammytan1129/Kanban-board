const DomainGateway = require('../domainGateway');
const DBTaskGateway = require('../taskGateway/dbTaskGateway');
const Board = require('../../model/board');
module.exports = class DBBoardGateway extends DomainGateway {
    constructor(database) {
        super(database);
        this._taskGateway = new DBTaskGateway(database);
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
        
        let taskList = await this._taskGateway.loadDomainWithForeignKey(board.id());
        board.setTaskList(taskList);
        return board;
    }

    async save(board) {
        await this.update(board);
        let taskList = board.taskList();
        
        for (let i = 0; i < taskList.length; i++) 
            await this._taskGateway.update(taskList[i]);
        
        return board;
    }
};