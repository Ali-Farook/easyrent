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
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: false
    },
    numberOfAdds: {
        type: String,
        default: '0',
        required: false
    },
});

const Agency = mongoose.model('Agency', agencySchema);
module.exports = Agency;