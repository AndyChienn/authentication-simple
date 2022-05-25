const mongoose = require('mongoose')
const Account = require('../../models/Account')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]



db.on('error', () => {
  console.log('MongoDB error!')
})


db.once('open', () => {
  Account.create(users)
    .then(() => {
      console.log('MongoDB Created new datas!')
    })
    .catch(error => console.log(error))
    .finally(() => db.close())

})

// db.once('open', () => {
//   users.forEach((user) => {
//     Account.create({
//       firstName: user.firstName,
//       email: user.email,
//       password: user.password
//     })
//   })
//   console.log('MongoDB Created new datas')
// })
// 要問如何跳出來 db.close