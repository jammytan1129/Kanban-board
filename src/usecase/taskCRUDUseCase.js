module.exports = class TaskCRUDUseCase {
    constructor(taskGateway) {
        this._taskGateway = taskGateway;
    }

    formatTask(taskStructure) {
        let task = this._taskGateway.loadDomainObjWithRow(taskStructure);
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
};