module.exports = class Task {
    constructor(state) {
        this._state = state; 
        this._cardList = [];
        this._id;
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

    getCardListSize() {
        return this._cardList.length;
    }
};