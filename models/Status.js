const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'name is required']
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: [true, 'type is required']
    },
    src: {
        type: String,
        required: [true, 'src is required']
    },
    text: {
        type: String
    },
    time: { 
        type: String, 
        required: [true, 'time is required'], 
    },
    seenByPartner: {
        type: Boolean,
        default: false
    },
    seenByPartnerTime: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Status', statusSchema);