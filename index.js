require('dotenv').config();
const express = require('express');
const { connectToMongoAtlas } = require('./db');
const authRoutes = require("./routes/auth/auth");
const addRoutes = require("./routes/adds/adds");
const agencyRoutes = require("./routes/agency/agency");
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cluster = require('cluster');
const os = require('os');
const path = require('path');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 70 // limit each IP to 120 requests per windowMs
});

// app.use('/', express.static(path.join(__dirname, 'public')));
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
        // console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    connectToMongoAtlas(process.pid);

    app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'welcome.html')));

    app.use('/api/auth', authRoutes)
    app.use('/api/adds', addRoutes)
    app.use('/api/agencies', agencyRoutes)

    app.listen(port, () => {
        console.log(`Worker ${process.pid} started`);
    });
}