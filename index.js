const express = require('express');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const connection = require('./connection');
const DeviceDetector = require('node-device-detector');
const { auth } = require('./middlewares/auth');
require('dotenv').config();
const app = express();

// const detector = new DeviceDetector({clientIndexes: true,deviceIndexes: true,deviceAliasCode: false});

app.use(express.json());
app.get('/',(req, res)=>{res.send('homepage')});
app.use('/users',userRoute);
app.use(auth)
app.use('/posts',postRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log('db is connected');
    } catch (error) {
        console.log('error',error)
    }
    console.log(`server in running on ${process.env.port}`)
})