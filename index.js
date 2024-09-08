const express = require('express');
require('dotenv').config();
const { connectToMongoAtlas } = require('./db');
const authRoutes = require("./routes/auth/auth");
const addRoutes = require("./routes/adds/adds");
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.send('<h1>Ali Farooq</h1>');
})
// CONNECT TO DATABASE
connectToMongoAtlas();

//  For Authentication
app.use('/api/auth', authRoutes)
app.use('/api/adds', addRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost/:${port}`);
});
