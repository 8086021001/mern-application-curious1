const InterestModal = require('../models/interests')



const getInterests = async(req,res)=>{
    try {
        const interestFields= await InterestModal.find({})
        return res.status(200).json({fileds:interestFields})

    } catch (error) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {getInterests}