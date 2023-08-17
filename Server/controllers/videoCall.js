const videoSchema = require('../models/videoCallSchema')
const UserSchema = require('../models/userSchema')



const scheduleVideoCall = async(req,res)=>{

    try {
        const authUserId = req.id
        const {reqUserId} =  req.body

        const ifReqAvailable = await videoSchema.find({users:{$all:[authUserId,reqUserId]}})
        console.log("founfff",ifReqAvailable)

        if(ifReqAvailable.length === 0){
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

const acceptAndRejReq = async (req, res)=>{
    try {
        const userId = req.id
        const{update,reId,selectedDate} = req.body.reqDat
        console.log(update,reId,selectedDate)

        if(update==="accepted"){
            console.log(update,reId,selectedDate)
            const updateData = {
                status:"accepted",
                scheduledTime:selectedDate
            }

            const requpdt = await videoSchema.findByIdAndUpdate(reId,
                updateData,
                {new: true})
            res.status(201).json({message:"success"})
            
        }else if(update === "rejected"){
            console.log("in reject",update,reId,selectedDate)
            const reqUpdate = await videoSchema.findByIdAndUpdate(reId,
                {status: "rejected"},
                { new: true }
                )
        }
        res.status(201).json({message:"success"})

    } catch (error) {
        
    }
}




module.exports = {scheduleVideoCall,fetchAlRequests,acceptAndRejReq}
