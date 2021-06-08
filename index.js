const express = require('express');
const mongoose = require('mongoose');
const Pusher = require("pusher");
const cors = require('cors');
const dotenv = require('dotenv');
const uuid = require('uuid');
const crypto = require("crypto");
dotenv.config();

const pusher = new Pusher({
    appId: "1214649",
    key: "75838d36413b7d5761a0",
    secret: "ec98eec54c44a12ecdbb",
    cluster: "ap2",
    useTLS: true
});
  
const chats = require('./routes/chats');
const notify = require('./routes/notify');
const statuses = require('./routes/statuses');

// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const chatsCollection = db.collection('chats');
  const changeStream = chatsCollection.watch();

  changeStream.on('change', (change) => {
      if(change.operationType === 'insert'){
          const chatDetails = change.fullDocument;
          //console.log("Details", chatDetails);
          pusher.trigger("chat", "newchat", chatDetails);
      }

      if(change.operationType === 'delete'){
          pusher.trigger("chat", "deletedchats", "deleted");
      }

  })

  // status sream
  const statusCollection = db.collection('status');
  const statusChangeSream = statusCollection.watch();
  statusChangeSream.on('change', (change) => {
      //console.log("change", change);
      if(change.operationType === 'insert'){
          const statusDetails = change.fullDocument;
          //console.log("Details", statusDetails);
          pusher.trigger("status", "newstatus", statusDetails);
      }
  })
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Mern chat app")
})

app.post('/api/v1/typing', (req, res) => {
    // console.log(req.body);
    pusher.trigger("typing", `${req.body.name}Typing`, req.body);
    res.status(200).send("typing")
})

app.use('/api/v1/chats', chats);
app.use('/api/v1/notify', notify);
app.use('/api/v1/statuses', statuses);

const privateKey = process.env.PRIVATE_KEY;

app.get('/auth', (req, res) => {
    // console.log("ran 3");
    const token = req.query.token || uuid.v4();
    const expire = req.query.expire || parseInt(Date.now()/1000)+2400;
    const privateAPIKey = `${privateKey}`;
    const signature = crypto.createHmac('sha1', privateAPIKey).update(token+expire).digest('hex');
    res.status(200);
    res.send({
        token : token,
        expire : expire,
        signature : signature
    });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`App Listening on port http://localhost:9000`));