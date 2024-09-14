require('dotenv').config();
const express = require('express');
const { connectToMongoAtlas } = require('./db');
const authRoutes = require("./routes/auth/auth");
const addRoutes = require("./routes/adds/adds");
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cluster = require('cluster');
const os = require('os');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 120 // limit each IP to 120 requests per windowMs
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);


if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    connectToMongoAtlas();

    app.get('/', (req, res) => res.send(`<h1>Ali Farooq</h1>`));

    app.use('/api/auth', authRoutes)
    app.use('/api/adds', addRoutes);

    app.listen(port, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
