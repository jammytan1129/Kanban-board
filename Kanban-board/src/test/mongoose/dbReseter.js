const Board = require('../../mongoModel/board');
const User = require('../../mongoModel/user');

module.exports = class DBReseter {
    constructor() {
    }

    resetDB() {
        Board.collection.drop();        
        User.collection.drop();
    }
};

