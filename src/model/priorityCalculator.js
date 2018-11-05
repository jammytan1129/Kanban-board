module.exports = class PriorityCalculator {
    constructor(elementList) {
        this._elementList = elementList;
    }

    getElementList() {
        return this._elementList;
    }

    getElementByIndex(index) {
        return this._elementList[index];
    }
    
    findElementById(id) {
        let element;
        for (let i = 0; i < this._elementList.length; i++) 
            if (this._elementList[i].id() == id)
                element = this._elementList[i];
        return element;
    }

    removeElement(element) {
        this._elementList = this._elementList.filter(function(e) { return e !== element });
    }

    resetPriority() {
        for (let i = 0; i < this._elementList.length; i++) 
            this._elementList[i].setPriority(i);
    }

    insertElementWithPriority(element, priority) {
        this._elementList.splice(priority, 0, element);
    }

    changeElementPriority(id, changePriority) {
        let modifiedElement = this.findElementById(id);
        this.removeElement(modifiedElement);
        this.insertElementWithPriority(modifiedElement, changePriority);
        this.resetPriority();
    }


  };