
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const Token = require("../models/token")
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const InterestModal = require('../models/interests')
const {verifyGoogletoken} = require('../controllers/verifyToken')
const cloudinary = require('cloudinary').v2;




cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


//SIGNUP

const Signup = async(req,res)=>{
    try {

        const ifUser = await User.findOne({
            email: req.body.email
        });
        console.log("hellooo is user there",ifUser)
        if (! ifUser) {
            const user = new User(req.body);
            await user.save();
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
            await sendEmail(user.email, "Verify Email -- Curious1", url);

            return res.status(201).json({user:user});
        } else {
            const checking = ifUser.isVerified
            if(!checking){
                return res.status(201).json({message: "Please check your email for verification link"})
            }else{
              return res.status(201).json({message: "User with given email already Exist!"})

            }
        }

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
const googelSignup = async (req,res)=>{
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    if(req.body.credential){

      const verificationResponse = await verifyGoogletoken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        })
      }
      const profile = verificationResponse?.payload;
      let checkgUser = await User.findOne({email:profile.email});
      
      if(!checkgUser){
        const newuser = await new User({
          name:profile?.name,
          email:profile.email,
          isVerified:true,
          image:profile?.picture,
          googleId:profile?.aud
        }).save()
        checkgUser = newuser
      }
      console.log(checkgUser)

    const token = jwt.sign({
        id: checkgUser._id
    }, jwtSecretKey, {expiresIn: "30hr"})
    return res.status(201).cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 36 * 1000),
        httpOnly: true,
        sameSite: 'lax'
    }).json({message: "Signup was successful", user: checkgUser, token})
    }
    
  } catch (error) {
    res.status(500).json({message:"Ivalid response"})

  }


}


const verifyEmail = async (req, res) => {
    try {
        console.log("user verified",req.params.id)
      const user = await User.findById(req.params.id );
      console.log(user)
      if (!user) return res.status(400).json({message:"Invalid link"});
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      console.log("token found")
      if (!token) return res.status(400).send({message:"Invalid link"});
  
      await User.updateOne({ _id: user._id}, {isVerified: true });
      await Token.findByIdAndRemove(token._id);
      res.status(200).json({message:"email verified sucessfully"});
    } catch (error) {
      res.status(400).send({message:"An error occured"});
    }
  };


  //signin in
const login = async(req,res)=>{
        try {
            const user = await User.findOne({email: req.body.email});
            if (user && user.isVerified) {
                console.log("user available")
                let comparePassword
                try {
                    comparePassword = await bcrypt.compare(req.body.password, user.password)
        
                } catch (error) {
                    console.log(error.message)
                    res.status(404).json("Please try again!")
                }
        
                if (comparePassword) {
                    let jwtSecretKey = process.env.JWT_SECRET_KEY;
                    let data = {
                        userId: user._id,
                        name: user?.name,
                        email: user.email,
                        image: user?.image,
                        isVerified:user.isVerified,
                        interests:user?.interests??[]
                    }
                    if (req.cookies[`${data._id}`]) {
                        req.cookies[`${data._id}`] = "";
                      }
        
                    const token = jwt.sign({
                        id: data.userId
                    }, jwtSecretKey, {expiresIn: "30hr"})
                    return res.status(200).cookie('token', token, {
                        path: "/",
                        expires: new Date(Date.now() + 1000 * 36 * 1000),
                        httpOnly: true,
                        sameSite: 'lax'
                    }).json({message: "Logged in!", user: user, token})
                } else {
                    return res.status(404).json({message: "Invalid password!"})
                }
            } else if(user && !user.isVerified) {
                    res.status(404).json({message:"Please verify your acount"})
            }else{

                console.log("User not avilable, create new user")
                res.status(404).json({message: "User not available"})
            }
            
        } catch (error) {
            res.status(500).json({message:"Ivalid response"})
        }
}



const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
  };



  const logout = (req, res) => {
try {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
} catch (error) {
  return res.status(500).json({ message: "Failed" });

}
  };



  const setFields = async(req,res)=>{
    try {
        let userID = req.id
        let userInterests = []
        let fieldArray = req.body

        fieldArray.forEach((field)=>{
          userInterests.push(field._id)
        })

        const userInterestsId = userInterests.map((intId) => {return new mongoose.Types.ObjectId(intId)})

        const interests = await InterestModal.find({ _id: { $in: userInterestsId } });
        if(interests){
          const userData = await User.findById(userID)
          console.log("userData ",userData)

          const newInterestsId = await userInterestsId.filter((interestId) => !userData.interests.includes(interestId));
          console.log("userData ",newInterestsId)

          if(newInterestsId.length>=0){
            console.log("userData ",newInterestsId)

            
          const result = await User.findByIdAndUpdate(
            userID ,
            { $push: { interests: { $each: userInterestsId } } },
            { new: true }
          );
          console.log("result being ",result)

          if (result) {
            return res.status(200).json({ message: "Fields added successfully" , user:result});
          } else {
            return res.status(400 ).json({ message: "Please check, you may be already entrolled!" });
          }
          }
          return res.status(400 ).json({ message: "Please check, you may be already entrolled!" });

        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to add fields" });
    }
  }

  const updateProfile = async(req,res)=>{
    try {
      const userId = req.id
      if(!req.file){
        res.status(500).json({message:'unable to upload data'})
      }
      const file = req.file
      const filePath = file.path
      const uniqueFilename = `${Date.now()}-${file.originalname}`; // Generate a unique file name

      let imageURL
  
      const uploadOptions = {
        folder: 'userProfile',
        public_id: uniqueFilename
      };
      await cloudinary.uploader.upload(filePath, uploadOptions, (error, result) => {
        if (error) {
          // Handle upload error
          res.status(500).json({ error: 'Failed to upload image' });
          return;
        }
          console.log("this is my url",result.secure_url);
          imageURL = result.secure_url
      });
  
      const userUpdate = await User.findByIdAndUpdate(userId,req.body, { new: true })

      if (imageURL) {
        userUpdate.image = imageURL;
      }
      
      if (req.body.password) {
        userUpdate.password = req.body.password;
        await userUpdate.save();
        res.status(200).json({user:userUpdate,message:"updated succesfully"})

      }
      await userUpdate.save();
      console.log("updated user",userUpdate)
      res.status(200).json({user:userUpdate,message:"updated succesfully"})
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to update' });
    }


  }


  const userFieldUpdate = async(req,res)=>{
    try {
      console.log("just for form",req.body)
      const userId = req.id
      const userUpdate = await User.findByIdAndUpdate(userId,req.body, { new: true })
      if (req.body.password) {
                userUpdate.password = req.body.password;
                await userUpdate.save();
                console.log('saving pass',userUpdate)
                return res.status(200).json({user:userUpdate,message:"updated succesfully"})

            }else{
              await userUpdate.save();
              res.status(200).json({user:userUpdate,message:"updated succesfully"})

            }


    } catch (error) {
      res.status(500).json({message:"upload failed"})
    }

  }

  const setBlogAsDraft = async(req,res)=>{
    try {
      const userId = req.id
      console.log(req.body,userId)
      const blogId = req.body.blogId
      let message
      const userSchema= await User.findById(userId)
      if(userSchema.savedBlogs.includes(blogId)){
        userSchema.savedBlogs.pull(blogId)
        message = "Blog removed from list"
      }else{
        userSchema.savedBlogs.addToSet(blogId)
        message = "Blog added to list"
      }
      await userSchema.save()
      console.log(userSchema)
      res.status(200).json({user:userSchema,message:message})

      
    } catch (error) {
      
      res.status(500).json({message:"failed"})

    }

  }

const getAllConnections = async(req,res)=>{
try {
  const userId = req.id
  // console.log("user being requesting for friends",userId)
  const userData = await User.findById(userId)
  const interestsId = userData.interests
  const userWithsimilarInterests = await User.find({
    interests: { $in: interestsId },
    _id: { $ne: userId },
  },
  {
    password: 0, 
  }
  )
  // console.log(userWithsimilarInterests)

  res.status(200).json({users:userWithsimilarInterests})
  
} catch (error) {
  res.status(500).json({message:"failed"})

}
  }


  const sendFollowandUnfollow = async(req,res)=>{
try {
  const authUserId = req.id
  const {usersID} = req.body
  console.log("Hiiiiiiiiii",usersID)

  const usertoUpdate = await User.findOne({ _id: authUserId, following: usersID });
  let updateUser;
  if (usertoUpdate) {
    updateUser = await User.findByIdAndUpdate(
      authUserId,
      { $pull: { following: usersID } },
      { new: true }
    );
    const otherUser = await User.findByIdAndUpdate(usersID,{$pull:{followers:authUserId}})
  } else {
    updateUser = await User.findByIdAndUpdate(
      authUserId,
      { $addToSet: { following: usersID } },
      { new: true }
    );
    const otherUser = await User.findByIdAndUpdate(
      usersID,
      {$addToSet:{followers:authUserId}},
      {new:true}
      )

  }
  if(updateUser){
    console.log("updated user to follow",updateUser)
  res.status(200).json({user:updateUser})
  }else{
    res.status(404).json({message:"Failed to update"})
  }
  
} catch (error) {
  res.status(500).json({message:"failed"})

}

        

  }


module.exports = {Signup,verifyEmail,login,getUser,logout,setFields,googelSignup,updateProfile,
  userFieldUpdate,setBlogAsDraft,getAllConnections,sendFollowandUnfollow}


