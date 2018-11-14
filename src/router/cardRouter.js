const CardController = require('../controllers/CardController');


var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});

module.exports = (app) => {
  /*
  {
    name,
    description,
    taskFk
  }
  */
  app.post('/findCard',
    CardController.findCard);
  app.post('/insertCard', 
    CardController.insertNewCardInToTask);  
};