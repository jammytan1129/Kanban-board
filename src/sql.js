const User = require('./mongoModel/user');
const Board = require('./mongoModel/board');
const WorkItem = require('./mongoModel/workItem');

var mongoose = require('./db/mongoose');


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


User.findOne({})
.then(user => {
  console.log(user);
})

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




