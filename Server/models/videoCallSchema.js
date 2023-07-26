const mongoose = require('mongoose')

const videoCallSchema = new mongoose.Schema({
    
        users:[  {
             type :  mongoose.Schema.Types.ObjectId,
             ref :'User',
            required : true, 
}],

        sender:{
            type : mongoose.Schema.Types.ObjectId,
            ref :'User'
        },
        scheduledTime: {
            type: Date,
          },
          status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
          },
          attended: {
            type: Boolean,
            default: false,
          },
          description: {
            type: String,
            // required: true,
          },

    
},
{
    timestamps:true
}
)


module.exports = mongoose.model('videoCall',videoCallSchema)
