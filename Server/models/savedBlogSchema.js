const mongoose = require('mongoose')

const savedblogSchema = new mongoose.Schema({

    title:{
        type:String,
    },
    summary:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    tags:Array,
    content:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})


module.exports = mongoose.model('savedblogSchema',savedblogSchema)