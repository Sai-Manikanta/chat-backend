const express = require('express');
const router = express.Router();

const { getChats, createChat, deleteChats } = require('../controllers/chats');

router.route('/')
    .get(getChats)
    .post(createChat)
    .delete(deleteChats)

module.exports = router