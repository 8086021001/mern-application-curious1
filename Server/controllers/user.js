
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const Token = require("../models/token")
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');




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

            return res.status(201).json({ message:"An Email sent to your account please verify" , user:user});
        } else {
            const checking = ifUser.isVerified
            if(!checking){
                return res.status(409).json({message: "Please check your email for verification link"})
            }
            return res.status(409).json({message: "User with given email already Exist!"})
        }

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


const verifyEmail = async (req, res) => {
    try {
        console.log(req.params.id)
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).json("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: user._id, isVerified: true });
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
                        interests:user?.interests??[]
                    }
                    if (req.cookies[`${data._id}`]) {
                        req.cookies[`${data._id}`] = "";
                      }
        
                    const token = jwt.sign({
                        id: data.userId
                    }, jwtSecretKey, {expiresIn: "1hr"})
                    return res.status(200).cookie(String(data.userId), token, {
                        path: "/",
                        expires: new Date(Date.now() + 1000 * 36 * 100),
                        httpOnly: true,
                        sameSite: 'lax'
                    }).json({message: "Logged in!", user: data, token})
                } else {
                    return res.json({message: "Invalid password!"})
                }
            } else if(user && !user.isVerified) {
                    res.status(404).json({message:"Please verify your acount"})
            }else{
                console.log("User not avilable, create new user")
                res.json({message: "User not available"})
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
        let fieldArray = req.body.field
        const result = await User.updateOne(
            { _id: userID },
            { $push: { fieldArray: { $each: interests } } },
            { upsert: true }
          );
          
          if (result.ok) {
            // Document was updated or upserted successfully
            return res.status(200).json({ message: "Fields added successfully" });
          } else {
            return res.status(500).json({ message: "Failed to add fields" });
          }
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to add fields" });
        
    }
  }


module.exports = {Signup,verifyEmail,login,getUser,logout,setFields}

