const mongoose = require('mongoose')
const { GridFSBucket } = require('mongodb');
const mongoURL = process.env.MongoDB_URL


let gridFSBucket;


const connectDb = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})};

module.exports =  {connectDb}