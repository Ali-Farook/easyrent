const mongoose = require('mongoose');
const { Schema } = mongoose;

const addSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // agencyId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Agency',
    //     required: false,
    //     default: ''
    // },
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
    heroImage: {
        type: String,
        default: '',
        required: true
    },
    images: {
        type: [String],
        default: [],
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    saleType: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Add = mongoose.model('Add', addSchema);
module.exports = Add;