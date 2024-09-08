const express = require('express');
require('dotenv').config();
const { connectToMongoAtlas } = require('./db');
const authRoutes = require("./routes/auth/auth");
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// CONNECT TO DATABASE
connectToMongoAtlas();

//  For Authentication
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost/:${port}`);
});
