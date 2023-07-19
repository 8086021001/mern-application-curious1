const mongoose = require('mongoose')


const interestsSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim:true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ]
})


module.exports = mongoose.model('interests',interestsSchema)