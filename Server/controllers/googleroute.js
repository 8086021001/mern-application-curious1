const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/userSchema')



const googleAuth = async (req,res)=>{
    try {
        console.log('in google auth route')
        
        const { token }  = req.body
        console.log(token)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();    
        const user = await User.findOne({email:email})
        if(!user){
            const newUser = await new User({
                name:name,
                email:email,
                image:picture
            })
            await newUser.save()
            .then((savedUser)=>{
                console.log('user saved from google :',savedUser)
            }).catch((error)=>{
                console.log(error)
            })
        }
        res.status(201).json(user)
        
    } catch (error) {
        res.status(500).json({mesage:"unable to login!"})
    }

}



module.exports = {googleAuth}