const mongoose = require('mongoose');
const { Schema } = mongoose;

const agencySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: {
            score: { type: Number, required: true },
            number: { type: String, required: true }
        },
        required: false,
        default: {
            score: 5,
            number: 1
        }
    },
    profile_image: {
        type: String,
        default: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        required: false
    },
    numberOfAdds: {
        type: Number,
        default: 0,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Agency = mongoose.model('Agency', agencySchema);
module.exports = Agency;