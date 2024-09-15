require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongoAtlas = (processId) => {

    mongoose.connect(mongoURI)
        .then(() => console.log(`${processId} is Connected to MongoDB Atlas`))
        .catch((error) => console.error(`${processId} has Error connecting to MongoDB->`, error));
};

module.exports = { connectToMongoAtlas };