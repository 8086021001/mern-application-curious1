const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    summary:{
        type:String,
        require:true
    },
    coverImage:{
        type:String,
        require:true
    },
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interests'

    }],
    content:{
        type:String,
        require:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      isReported:{
        type:Boolean,
        default:false
      },
      isDeleted:{
        type:Boolean,
        default:false

      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

// MyModel.find({$text: {$search: searchString}})
//        .skip(20)
//        .limit(10)
//        .exec(function(err, docs) { ... });

module.exports = mongoose.model('blogSchema',blogSchema)