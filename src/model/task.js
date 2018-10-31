module.exports = class Task {
    constructor(state) {
        this._state = state; 
        this._cardList = [];
        this._id;
        this._boardFk;
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
        let modifiedCard = this.findCardById(id);
        console.log(modifiedCard);
        this.removeCard(modifiedCard);
        this.insertCardWithPriority(modifiedCard, changePriority);
        this.resetPriority();
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