const express = require('express')
const app = express()
const db = require('./database/dbConnection')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const userRoutes = require('./routes/userRoutes')


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


app.use(cookieParser());

app.use('/user',userRoutes)



const appEndPoint = async(url)=>{
    try {
        await db.connectDb(url)
        app.listen(port,()=>{console.log('App connected to db and listening at port  ')})
        
    } catch (error) {
        
        console.log(error)
    }

}
appEndPoint(url)


