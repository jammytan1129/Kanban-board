const User = require('./mongoModel/user');
const Board = require('./mongoModel/board');
const WorkItem = require('./mongoModel/workItem');

//const mongoose = require('./db/mongoose');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.mongoose.url, { useNewUrlParser: true });
mongoose.connection.once('open', function() {
    console.log('connect to mongooseDB successfully');
}).on('error', function(err) {
    console.log(err.message);
});

let boardIdList = [ '5c03e0b8912ea5dd36e3e341',
'5c03e3edff7e21deeb10a4a1',
'5c03e4e24b2b60df76102711',
'5c03e4f12731a5df84eada03',
'5c03e506ec024adf9e83942f',
'5c03e51f2c54d7dfa8837ca1',
'5c03e5a4a5fa68dfcf756183',
'5c03ed72cac932e1b6ce5308',
'5c03eda4e356e6e222c821ea',
'5c03edba3a10b1e22da13e73',
'5c03ee3da9c012e249f808b5',
'5c03f01732c094e2bda3a161',
'5c03f039b7d7b5e2d2ba75ce',
'5c03f0ba5455eae2fee97724' ];
 

Board.find({ _id: { $in: boardIdList }})
.then(boards => {
    console.log(boards);
})

// Board.findOne({})
// .then(board => {
//     console.log(board);
// })

// let userInfo = { _id: '5c0241f032a9ceb5284198a7',
// email: 'bitch3',
// password: 'test123',
// __v: '4',
// name: 'bitch',
// phone: '0988628781' };

// User.updateOne({_id: '5c0241f032a9ceb5284198a7'}, userInfo)
// .then(updateResult => {
//     console.log(updateResult);
//     return User.find({_id: '5c0241f032a9ceb5284198a7'});
// })
// .then(user => {
//     console.log(user);

// })

// User.updateOne({_id: '5c0241f032a9ceb5284198a7'}, { name: 'amber' })
// .then(user => {
//     console.log(user);
// })

// User.findOne({_id: '5c0241f032a9ceb5284198a7'})
// .then(user => {
//     console.log(user);
// })
//const mongoose = require('mongoose');
// User.collection.drop(function() {
//   console.log('ok');
// })

// User.findOne({})
// .then(user => {
//   console.log(user);
//   user.email += '123';
//   return User.updateOne({_id: user._id}, user);
// })
// .then(updateResult => {
//   console.log(updateResult);
//   return User.findOne({});
// })
// .then(user => {
//   console.log(user);
// })

// Board.find({})
//   .where('_id')
//   .in(['5bec116ba2ff18b9b7ff223c', '5bf7bfca1ec24071745b0300'])
//   .exec(function(err, records) {
//     console.log(records);
// })



// let workItem = new WorkItem({
//   title: 'card',
//   description: 'card is a description',
//   estimated_effort: 20
// });

// workItem
//   .save()
//   .then(work => {
//     console.log(work);
//   })
// User.findOne({})
// .then(user => {
//   console.log(user);
// })

// User.find({_id: '5be64642cc32b011eed6884d'})
// .then(user => {
//   console.log(user);
// })
// Board.findOne({'stage_list.work_items': { $elemMatch: { _id: '5be789e0a7f5de4408662433' }}}, { 'stage_list.work_items.$': 1 })
// .then(work => {
//   console.log(work.stage_list[0].work_items);
// })
//db.multiArr.find({'Keys':{$elemMatch:{$elemMatch:{$in:['carrot']}}}})
// // 5be68cf82fc9a72596136196
// User.findOne({})
// .then(user => {
//   return Board.findOne({'_id': user.board_list[1].boardFk })
// })
// .then(board=> {
//   console.log(board);
// })
// Board.findOne({name: 'kanboard'})
// .then(record => {
//   console.log(record.stage_list[0].work_items[0]);
// })
// let board = new Board({
//   name: 'kanboard',
//   background: 'ddd',
//   stage_list: [
//     {
//       title: 'done',
//       work_items: [
//         {
//           title: 'card',
//           description: 'mycard'
//         }
//       ]
//     }
//   ]
// });
// board.save().then(res => {
//   console.log(res);
// })
// Board.updateOne({_id: '5be68cf82fc9a72596136196'},
//   { $pull: { "stage_list.0.work_items": {"title": 'card'}} })
//   .then(res => {
//     console.log(res);
//   })
// Board.findOne({name: 'kanboard'})
// .then(record => {
//   record.stage_list[0].work_items.push({
//     title: 'card',
//     description: 'mycard',
//     priority: 0,
//     estimated_effort: 20,
//     expired_date: new Date(2014, 11, 12, 14, 12)
//   });
//   return record.save();
// })
// .then(record => {
//   console.log(record);
// })
// .then(res => {
//   console.log(res);
// })
// User
// .findOne({name: 'dddddd'})
// .then(function(result) {
//   console.log(result);
//   mongoose.disconnect();
// })
// .catch(err => {
//   console.log(err.message);
// })




