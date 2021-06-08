const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'name is required']
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video'],
        required: [true, 'type is required']
    },
    text: {
        type: String
    },
    src: {
        type: String
    },
    time: { 
        type: String, 
        required: [true, 'time is required'], 
    }
});

module.exports = mongoose.model('Chat', chatSchema);