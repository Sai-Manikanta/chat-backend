const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const uuid = require('uuid');
const crypto = require("crypto");
dotenv.config();
  
const notify = require('./routes/notify');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Mern chat app")
})

app.use('/api/v1/notify', notify);

const privateKey = process.env.PRIVATE_KEY;

app.get('/auth', (req, res) => {
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