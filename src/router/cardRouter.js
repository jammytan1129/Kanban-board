const CardController = require('../controllers/CardController');
const path = require('path');

module.exports = (app) => {
    //app.post('/findCard', CardController.fetchCardData);
    app.post('/updateDescription', CardController.updateDescription);

    app.post('/leaveComment', CardController.leaveComment);
};