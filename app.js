const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Account = require('./models/Account')

const mongoose = require('mongoose')
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body

  Account.findOne({ email, password })
    .then(user => {
      if (!user) {
        res.render('fail')
      } else if (user) {
        res.render('loginin', { userName: user.firstName })
      }
    })
    .catch(error => console.error(error))

})

app.listen(port, (req, res) => {
  console.log(`Its running on http://localhost:${port}`)
})