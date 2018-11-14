const GatewayFactory = require('../gateway/gatewayFactory');
const Card = require('../model/card');


module.exports = {
    async findCard(req, res) {
        let cardGateway = GatewayFactory.createCardGateway();
        let card = await cardGateway.find(req.body.id);
        res.send(card);
    },
    async insertNewCardInToTask(req, res) {
        let taskFk = req.body.taskFk;
        let name = req.body.name;
        let description = req.body.description;    
        // check whether the number of card in the task excesses the limited number
        let taskGateway = GatewayFactory.createTaskGateway();
        let task = await taskGateway.find(taskFk);

        if (task.hasExceedLimit()) {
            return res.status(500).send('the number of card in the task has exceeded valid limited number');
        }

        let card = new Card(name);
        card.setDescription(description);
        card.setTaskFk(taskFk);

        let cardGateway = GatewayFactory.createCardGateway();
        let insertedCard = await cardGateway.insert(card);

        res.send(insertedCard);
    }
}