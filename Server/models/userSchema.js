const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");




const userSchema = new mongoose.Schema({
    name: {
      type: String,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    about: {
      type: String,
      default:"New here!",
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    image: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    savedBlogs:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Blog',
      default: [],

    },
    isMentor: {
      type: Boolean
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    interests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'interests'
    }],
    blogsPublished: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogSchema'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    wallet: {
      type: Number,
      default: 0,
      required: true
    },
    isPremium:{
      type:Boolean,
      default:false,
    },
    googleId: {
      type: String
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
  });



  userSchema.pre("save", function (next) {
    const user = this
    if(user.googleId){
      console.log('here in google')

     return next()
    }
    if (this.isModified("password") || this.isNew) {
      console.log('bcrypting password here in schema')
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
  




module.exports = mongoose.model('User',userSchema)