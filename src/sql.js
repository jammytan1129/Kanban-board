console.log('hello');

// var hash = bcrypt.hashSync("bacon");
// console.log(hash);


let a = new Promise((resolve, reject) => { 
    setTimeout(function() {
        resolve(2222);
    }, 1000);
});


a.then(value=> {
    console.log(value);
})
.catch(err => {
    console.log(err.message);
})

console.log('before promise');





a.then(value => {
    console.log(value);
})

console.log('after promise');

// let isMatch = bcrypt.compareSync('1234', '$2a$10$16TV/29bZwDUwmzwwMzhK.HdndDaNLMk5ymUfRmC.mRbEgsnbzZEq'); // true
// console.log(isMatch);

//const someOtherPlaintextPassword = 'not_bacon';

// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//     // Store hash in your password DB.
//     console.log(hash);

// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
//     // res == true
//     console.log(res);
// });


// const DomainGateway = require('./gateway/domainGateway');

// const Item = require('./model/item');

// class ItemGateway extends DomainGateway {
//     constructor() {
//         super();
//     }

//     findSQL(id) {
//         return `select * from Item where id = ${id}`;
//     }
    
//     insertSQL(domainObj) {
//         return `insert into item(id, content, isDone, create_at, update_at, todoFk) values(null, '${domainObj.content()}', 0, null, null, ${domainObj.todoFk()});`
//     }

//     loadDomainObjWithRow(row) {
//         let item = new Item(row.content);
//         item.setId(row.id);
//         item.setIsDone(row.isDone);
//         item.setTodoFk(row.todoFk);
//         return item;
//     }
  
// };

// let itemGateway = new ItemGateway();

// let result = itemGateway.find(88);
// result.then(item => {
//     console.log(item);
// });
// function setUp() {
//     const result = delayES8(1000);
//     result
//       .then(value => {
//         console.log('value');
//         console.log(value);
//       })
//       .catch(err => console.log(err));
// }

// async function delayES8(time) {
//     let result = await delay(time);
//     try {
//         let result2 = await delay('result');
//     } catch (err) {
//         console.log(err);
//     }
//     return result;
// }

// function delay(time) {
//     return new Promise((resolve, reject) => {
//         if (isNaN(time))
//             reject('this is a bad thing ');

//         setTimeout(() => {
//             resolve(200);
//         }, time);
//     });
// }

// setUp();

