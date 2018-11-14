const PriorityCalculator = require('./priorityCalculator');


module.exports = class Task {
    constructor(state) {
        this._state = state; 
        this._cardList = [];
        this._id;
        this._boardFk;
        this._priority;
        this._limited;
    }  

    isLessThanOldLimited(newLimited) {
        return this._cardList.length > newLimited;
    }

    hasExceedLimit() {
        console.log(this._cardList.length);
        return this._cardList.length >= this._limited;
    }

    limited() {
        return this._limited;
    }

    setLimited(limited) {
        this._limited = limited;
    }

    priority() {
        return this._priority;
    }
    
    setPriority(priority) {
        this._priority = priority;
    }

    findCardById(id) {
        let target;
        for (let i = 0; i < this._cardList.length; i++) 
            if (this._cardList[i].id() == id)
                target = this._cardList[i];
        return target;
    }

    removeCard(card) {
        this._cardList = this._cardList.filter(function(e) { return e !== card });
    }

    resetPriority() {
        for (let i = 0; i < this._cardList.length; i++) 
            this._cardList[i].setPriority(i);
    }

    insertCardWithPriority(card, priority) {
        this._cardList.splice(priority, 0, card);
    }

    changeCardPriority(id, changePriority) {
        let calculator = new PriorityCalculator(this._cardList);
        calculator.changeElementPriority(id, changePriority);
        this.setCardList(calculator.getElementList());
    }

    boardFk() {
        return this._boardFk;
    }

    setBoardFk(boardFk) {
        this._boardFk = boardFk;
    }

    state() {
        return this._state;
    }

    id() {
        return this._id;
    }
    
    setState(state) {
        this._state = state;
    }

    setId(id) {
        this._id = id;
    }

    addCard(card) {
        this._cardList.push(card);
    }

    setCardList(cardList) {
        this._cardList = cardList;
    }

    cardList() {
        return this._cardList;
    }

    getCardListSize() {
        return this._cardList.length;
    }
};