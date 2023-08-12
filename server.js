const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();


//rest object
const app = express()

app.use(express.json())

//routes
app.use('/api/v1/auth', require('./routes/authRoute'))

//port
const PORT = process.env.PORT || 5000;

//Listen
app.listen(PORT, () => {
    console.log(`Node Server is running on port ${process.env.PORT}`)
})