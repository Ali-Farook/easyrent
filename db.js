require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongoAtlas = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    });
};

module.exports = { connectToMongoAtlas };