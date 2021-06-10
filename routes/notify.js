const express = require('express');
const Vonage = require('@vonage/server-sdk');
const router = express.Router();

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

const from = "Come to online..."
const to = "919505629940"
const text = 'https://angelll.xyz'

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