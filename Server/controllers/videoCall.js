const videoSchema = require('../models/videoCallSchema')
const UserSchema = require('../models/userSchema')



const scheduleVideoCall = async(req,res)=>{

    try {
        console.log("Heyyy in videocalll",req.body)
        const authUserId = req.id
        const {reqUserId} =  req.body

        const ifReqAvailable = await videoSchema.find({users:{$all:[authUserId,reqUserId]}})

        if(!ifReqAvailable){
            const reqDaTa = {
                users:[authUserId,reqUserId],
                sender:authUserId,
            }
    
            const newVideoCallReq = new videoSchema(reqDaTa)
            await newVideoCallReq.save()

            res.status(201).json({message:"success",callDat:newVideoCallReq})

        }else{
            res.status(200).json({message:"success",callDat:ifReqAvailable})

        }
        
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }
}


const fetchAlRequests = async(req,res)=>{
    try {
        const userId = req.id
        const checkWithId = await videoSchema.find({users:{$in:userId}})
        .populate({
            path: 'users',
            select: '_id name image', 
          })
          .populate({
            path: 'sender',
            select: '_id name  image', 
          })

          res.status(200).json({reqData:checkWithId,message:"success"})
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }
}




module.exports = {scheduleVideoCall,fetchAlRequests}
