const CardController = require('../controllers/CardController');
const path = require('path');

module.exports = (app) => {
    //app.post('/findCard', CardController.fetchCardData);
    app.post('/updateDescription', CardController.updateDescription);

    app.post('/leaveComment', CardController.leaveComment);

    app.post('/findCard', CardController.findCard);

    app.post('/moveCard', CardController.moveCardPosition);

    app.post('/appendTagToCard', CardController.appendTagToCard);
    
    app.post('/assignMemberToCard', CardController.assignMemberToCard);

    app.post('/removeLabelFromCard', CardController.removeLabelFromCard);

    app.post('/removeAssignedMemberFromCard', CardController.removeAssignedMemberFromCard);;
};