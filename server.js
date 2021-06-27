//importing .env file
require('dotenv').config()

//calling express
const express = require('express');
const app = express();

//configring mongoose to connect to mongoDB database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })

//To get connection with database
const db = mongoose.connection
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('Connected to database...'));

app.use(express.json()) // to accept json format from get, put requests

const subscribersRouter = require('./routers/subscribers');
app.use('/subscribers', subscribersRouter);

const subscribersRuter = require('./routers/subscribers')


//runs when server has started
app.listen(3000, () => console.log("Listening at port 3000..."))