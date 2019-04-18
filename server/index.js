const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


//App
const app = express()


//Use routes
const users = require('./routes/users')

app.get('/', (req, res)=>{
  res.json({index: true})
})

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Connect to DB
const db = require('./config/keys').dbURI

mongoose.connect(db,  { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

  //app.use(cors());
  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Use Public Foler
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));


//Use Routes
app.use('/users', users)


//Run Server
  const PORT = process.env.PORT || 5000

  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
  })
