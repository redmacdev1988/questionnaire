
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv'; // needed for reading .env file
import router from './router/route.js';
import connect from './database/conn.js';

import Express from "express";
var app = Express();

config(); // configure to read env file

connect().then(() => {  

}).catch(error => {
    console.log("Invalid Database Connection");
});

app.use(morgan('tiny'));
app.use(
    cors()
);
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
    try {
        res.json("Welcome to RickyABC")
    } catch (error) {
        res.json(error)
    }
})
app.use('/api', router) 

app.listen(process.env.PORT, () => {
    console.log("Server is running!");
});





