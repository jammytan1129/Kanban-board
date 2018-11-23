const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BoardSchema = new Schema({
    boardFk: String
});

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    nick_name: String,
    icon_url: String,
    board_list: [BoardSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
