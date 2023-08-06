const express = require('express')
const app = express()
const db = require('./database/dbConnection')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const fs = require('fs');
const chatRoutes = require('./routes/chatRoutes')
const io = require('./socket/socket')
const path = require('path')



const port = process.env.PORT
const url = process.env.MongoDB_URL

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH','DELETE'],
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-access-token','Cookie']
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.use(express.static(path.join(__dirname, ('./public'))))

app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'html');






app.use(cookieParser());

app.use('/user',userRoutes)
app.use('/user',blogRoutes)
app.use('/user',chatRoutes)
app.use('/user',paymentRoutes)


const appEndPoint = async(url)=>{
    try {
        await db.connectDb(url)
        const server =  app.listen(port,()=>{console.log('App connected to db and listening at port  ')})
        io.attach(server)
    } catch (error) {
        
        console.log(error)
    }

}
appEndPoint(url)


