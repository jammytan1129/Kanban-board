module.exports = class Todo {
  constructor(title) {
    this._title = title;
    this._itemList = [];
    this._id;
    this._cardFk;
  }

  setCardFk(cardFk) {
    this._cardFk = cardFk;
  }

  cardFk() {
    return this._cardFk;
  }

  setItemList(itemList) {
    this._itemList = itemList;
  }

  getItemListSize() {
    return this._itemList.length;
  }

  setId(id) {
    this._id = id;
  }

  id() {
    return this._id;
  }

  title() {
    return this._title;
  }

  addItem(item) {
    this._itemList.push(item);
  }

  getItemList() {
    return this._itemList;
  }

  itemSize() {
    return this._itemList.length;
  }

  getItemByIndex(index) {
    return this._itemList[index];
  }

  calculateCompletePercentage() {
    if (this.itemSize() == 0)
      return 0;

    var size = this.itemSize();
    var count = this.getCompleteItemCount();
    return count / size;
  }

  getCompleteItemCount() {
    var count = 0;
    for (var i = 0; i < this.itemSize(); i++)
      if (this.getItemByIndex(i).isDone() == true)
        count++;
    return count;
  }

  markItemDoneByIndex(index) {
    this.getItemByIndex(index).markDone();
  }

  setTitle(title) {
    this._title = title;
  }
};