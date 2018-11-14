var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});

const BoardController = require('../controllers/BoardController');

module.exports = (app) => {
  /*
  {
    name,
    description,
    taskFk
  }
  */
  app.post('/myBoard',
    BoardController.myBoard);
  /*
  {
      boardId:....
      title:.....
  }
  */
  app.post('/insertNewStage',
    BoardController.insertNewStage);
  /* 
  {
      stageId,
      title
  }
  */
  app.post('/insertNewCard',
    BoardController.insertNewCardToStage);
  /* 
  {
      boardId,
      userId
  }
  */
  app.post('/addNewMember', BoardController.addNewMember);
};