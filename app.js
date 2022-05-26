const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')

const port = 3000
const Account = require('./models/Account')

// const session = require('express-session')

const mongoose = require('mongoose')
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'test session',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  if (req.session.login) {
    console.log('loging yes')
    const sessionName = req.session.name
    console.log('session name', req.session.name)
    return res.render('loginin', { sessionName: sessionName })
  }
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body

  Account.findOne({ email, password })
    .then(user => {
      if (!user) {
        res.render('fail')
      } else if (user) {
        // res.cookie('username', '001')
        // res.status(200).send('登入成功')
        console.log('session', req.session)
        req.session.login = true
        console.log('session new', req.session)
        // user.sessionID = req.sessionID
        req.session.name = user.email
        // console.log('sessionID', req.sessionID)
        // console.log('usersessionID', user.sessionID)
        console.log(user)

        res.render('loginin', { userName: user.firstName })
      }
    })
    .catch(error => console.error(error))

})

app.listen(port, (req, res) => {
  console.log(`Its running on http://localhost:${port}`)
})