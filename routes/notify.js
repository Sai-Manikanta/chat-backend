const express = require('express');
const Vonage = require('@vonage/server-sdk');
const router = express.Router();

const vonage = new Vonage({
    apiKey: "c64a2366",
    apiSecret: "hoADWvtRoe3nfljh"
})

const from = "Come to online..."
const to = "919505629940"
const text = 'https://powerful-dusk-40978.herokuapp.com/learn.html?name=Friend1'

router.get('/', (req, res) => {
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            res.status(417).json({ status: "error" })
        } else {
            if(responseData.messages[0]['status'] === "0") {
                res.status(200).json({ status: "success" })
            } else {
                res.status(417).json({ status: "error" })
            }
        }
    })
})

module.exports = router