const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userFk: String,
    text: String,
    date: Date
});

const AssignSchema = new Schema({
    userFk: String
});

const TagSchema = new Schema({
    color: String,
    text: String
});

const WorkItemSchema = new Schema({
    title: String,
    description: String,
    priority: Number,
    estimated_effort: Number,
    expired_date: Date,
    comments: [CommentSchema],
    assign: [AssignSchema],
    tags: [TagSchema],
    todo_list: [],
});

const StageSchema = new Schema({
    title: String,
    WIP_limit: Number,
    border_color: String,
    work_items: [WorkItemSchema] // embeded
});

const UserSchema = new Schema({
    userFk: String,
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