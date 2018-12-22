const User = require('./mongoModel/user');
const Board = require('./mongoModel/board');
const WorkItem = require('./mongoModel/workItem');

//const mongoose = require('./db/mongoose');
const mongoose = require('mongoose');
const config = require('./config/config');
const DBReseter = require('./test/mongoose/dbReseter');

mongoose.connect(config.mongoose.url, { useNewUrlParser: true });
mongoose.connection.once('open', function() {
    //console.log('connect to mongooseDB successfully');
    //let dbReseter = new DBReseter();
    //dbReseter.resetDB()
}).on('error', function(err) {
    console.log(err.message);
});

User.find({})
.then(users => {
    users.map(user => {
        console.log(user.email);
        console.log(user._id);
    })
})





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




