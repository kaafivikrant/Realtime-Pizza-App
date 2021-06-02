const { static } = require('express')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended : true}))

//database connection
const url= 'mongodb://localhost/pizza'
mongoose.connect(url, 
  { useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify : true 
  });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

// assets
app.use(express.static('public'))

app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT , () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})