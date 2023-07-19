const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Messages'
    },


},
{
    timestamps: true,
}
)


module.exports = mongoose.model('chat',chatSchema)