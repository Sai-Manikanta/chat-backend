const Chat = require('../models/Chat');

// @desc get all chats
// @route GET /api/v1/chats
// @access public
const getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find();
        return res.status(200).json({
            success: true,
            data: chats
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc craete chat
// @route Post /api/v1/chats
// @access public
const createChat = async (req, res, next) => {
    try {
        const chat = await Chat.create(req.body);
        return res.status(201).json({
            success: true,
            data: chat
        })
    } catch(err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
      
            return res.status(400).json({
              success: false,
              error: messages
            });
        } else {
            return res.status(500).json({
              success: false,
              error: 'Server Error'
            });
        }
    }
}

const deleteChats = async (req, res, next) => {
    try {
        await Chat.deleteMany();
        return res.status(200).json({
            success: true,
            message: 'deleted'
        })
    } catch (err) {
        return res.status(417).json({
            success: false,
            error: err.message
        });
    }
}

module.exports = { getChats, createChat, deleteChats }