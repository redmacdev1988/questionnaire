
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv'; // needed for reading .env file
import router from './router/route.js';
import connect from './database/conn.js';

import Express from "express";
import https from "https";
import fs from "fs";


var app = Express();

app.use(morgan('tiny'));
app.use(cors());
app.use(Express.json());

config(); // configure to read env file

const port = process.env.PORT || 8080;

// routes
app.get('/', (req, res) => {
    try {
        res.json("Welcome to RickyABC")
    } catch (error) {
        res.json(error)
    }
})
app.use('/api', router) 

connect().then(() => {  
    try {
        https.createServer({
            key: fs.readFileSync("certs/private.key"),
            cert: fs.readFileSync("certs/certificate.crt"),
            ca: fs.readFileSync("certs/ca_bundle.crt"),
        }, app).listen(443, () => {
            console.log("Listening at :443...");
        });
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})







