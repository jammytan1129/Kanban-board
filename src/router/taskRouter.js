const TaskController = require('../controllers/TaskController');


//var parser = require('body-parser');
//var urlencodedParser = parser.urlencoded({extended : false});

module.exports = (app) => {
  /*
  {
    name,
    description,
    taskFk
  }
  */
  app.post('/updateLimiedNumber', 
    TaskController.updateTaskLimitedNumber);  
};