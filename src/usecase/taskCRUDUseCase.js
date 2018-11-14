
const GatewayFactory = require('../gateway/gatewayFactory');
const Task = require('../model/task');

module.exports = class TaskCRUDUseCase {
    constructor(taskGateway) {
        this._taskGateway = taskGateway;
    }

    formatTask(inputData) {
        //let task = this._taskGateway.loadDomainObjWithRow(taskStructure);
        let task = new Task(inputData.state);
        task.setBoardFk(inputData.boardFk);
        return task;
    }

    async insertNewTaskToColumn(taskStructure) {
        let task = this.formatTask(taskStructure);
        try {
            let insertedTask = await this._taskGateway.insert(task);
            return insertedTask;
        } catch (err) {
            console.log(err.message);
            throw Error(err.message);
        }
    }

    async findTask(id) {
        try {
            let task = await this._taskGateway.find(id);
            return task;
        } catch (err) {
            console.log(err.message);
            throw Error(err.message);
        }
    }

    async deleteTask(id) {
        try {
            let deleteResult = await this._taskGateway.delete(id);
            return deleteResult;
        } catch (err) {
            throw Error(err.message);
        }
    }

    async updateTask(taskStructure) {
        let task = this.formatTask(taskStructure);
        try {
            let updateResult = await this._taskGateway.update(task);
            return updateResult;
        } catch (err) {
            console.log(err.message);
            throw Error(err.message);
        }
    }

    async loadAllTask() {
        try {
            let taskList = await this._taskGateway.loadAllTask();
            return taskList;
        } catch(err) {  
            console.log(err.message);
            throw Error(err.message);
        }
    }
    /*
    {
        taskFk,
        targetTaskFk,
        id,
        priority,
    }
    */
    async findCardById(id) {
        let cardGateway = GatewayFactory.createCardGateway();
        let card = await cardGateway.find(strcture.id);
        return card;
    }

    createCardGateway() {
        return GatewayFactory.createCardGateway();
    }

    async updateCardToNewTask(strcture) {
        let cardGateway = this.createCardGateway();
        let card = await cardGateway.find(strcture.id);
        card.setTaskFk(strcture.targetTaskFk);
        let priority = await cardGateway.loadPriorityWithTaskFk(strcture.targetTaskFk);
        card.setPriority(priority);
        await cardGateway.update(card);
    }

    async shiftTaskCardPriority(strcture) {
        let originTask = await this._taskGateway.find(strcture.taskFk);
        originTask.resetPriority();
        await this._taskGateway.save(originTask);
    }

    async changeTaskOfCardAndCardPriority(strcture) {
        // 1 update card to the new task
        await this.updateCardToNewTask(strcture);
        // 2 shift all of card in the original task
        await this.shiftTaskCardPriority(strcture);
        // 3 change card priority in the new task
        let cardStructure = {
            taskFk: strcture.targetTaskFk,
            id: strcture.id,
            priority: strcture.priority
        };
        return await this.changeCardPriority(cardStructure);
    }
    /*
    {
        taskFk,
        id,
        priority,
    }
    */
    async changeCardPriority(cardStructure) {
        let task = await this._taskGateway.find(cardStructure.taskFk);
        task.changeCardPriority(cardStructure.id, cardStructure.priority);        
        await this._taskGateway.save(task);
        return task;
    }

    async updateTaskLimitedNumber(inputData) {
        let task = await this._taskGateway.find(inputData.id);
        if (task.isLessThanOldLimited(inputData.limited))
            throw Error('update limited number can not lower than exsited limited number');

        let udpateResult = await this._taskGateway.updateLimitedNumber(inputData);
        return udpateResult;
    }
};