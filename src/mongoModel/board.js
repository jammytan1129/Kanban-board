const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WorkItemSchema = new Schema({
    title: String,
    description: String,
    priority: Number,
    estimated_effort: Number,
    expired_date: Date,
    todo_list: [],
    comments: [],
    assign: [],
    tags: []
});

const StageSchema = new Schema({
    title: String,
    WIP_limit: Number,
    work_items: [WorkItemSchema] // embeded
});

const TagSchema = new Schema({
    content: String,
    color: String
});


const UserSchema = new Schema({
    userFk: String,
    name: String,
    email: String,
    icon_url: String
});

const BoardSchema = new Schema({
    name: String,
    background_url: String,
    members: [UserSchema], // embeded
    stage_list: [StageSchema], //embeded
    tags: [TagSchema]
});

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;


