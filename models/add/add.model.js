const mongoose = require('mongoose');
const { Schema } = mongoose;

const addSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: [],
        required: false
    },
    size: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Add = mongoose.model('Add', addSchema);
module.exports = Add;