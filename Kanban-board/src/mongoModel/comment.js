const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    cardFk: String,
    user: String,
    text: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;




// const board = {
//     name: "Prototyping",
//     background_url: "",
//     tag: [
//         {content: "feature", color: "#000000"},
//         {content: "doc", color: "#00ff00"},
//         {content: "bug", color: "#ff0000"},
//         {content: "support", color: "#0123000"}
//     ],
//     stage_list: [
//         stage1
//     ],
//     members: [
//         {id: 0, name: "lucy", email: "lucy@gmail.com", icon_url: ''},
//         {id: 1, name: "jammy", email: "jammy@gmail.com", icon_url: ''},
//         {id: 2, name: "hong", email: "hong@gmail.com", icon_url: ''},
//         {id: 3, name: "jen", email: "jen@gmail.com", icon_url: ''},
//     ]
// }