
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const Token = require("../models/token")
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const InterestModal = require('../models/interests')
const {verifyGoogletoken} = require('../controllers/verifyToken')

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
    return res.status(201).cookie(String(checkgUser._id), token, {
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
      if (!user) return res.status(400).json("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      console.log("token found")
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: user._id}, {isVerified: true });
      await Token.findByIdAndRemove(token._id);
      res.status(200).json("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  };


  //signin
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
                    res.status(401).json("Please try again!")
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
                    return res.status(200).cookie(String(data.userId), token, {
                        path: "/",
                        expires: new Date(Date.now() + 1000 * 36 * 1000),
                        httpOnly: true,
                        sameSite: 'lax'
                    }).json({message: "Logged in!", user: user, token})
                } else {
                    return res.status(401).json({message: "Invalid password!"})
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

  const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      console.log('id in logout',user.id)
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
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
          const result = await User.findByIdAndUpdate(
            userID ,
            { $push: { interests: { $each: userInterestsId } } },
            { new: true }
          );
          if (result) {
            return res.status(200).json({ message: "Fields added successfully" , user:result});
          } else {
            return res.status(400 ).json({ message: "Failed to add fields" });
          }
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to add fields" });
        
    }
  }


module.exports = {Signup,verifyEmail,login,getUser,logout,setFields,googelSignup}

