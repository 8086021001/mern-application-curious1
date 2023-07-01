const fs = require('fs');
const path = require('path')
const cheerio  = require('cheerio')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const crypto = require('crypto');
const BlogPost = require('../models/blogSchema')
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const User = require('../models/userSchema')
const InterestSchema = require('../models/interests')



cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});






const PostBlog = async(req,res)=>{
  try {

      const userId = req.id
      console.log(userId)
      const paths = req.file.path.slice(7)
      const filepath = `http://localhost:5000/${paths}`
  
    const {title,summary,tags} = req.body
  
      const  htmlContent = req.body.content
  
  
      const processedContent = await processAndSaveImages(htmlContent);
  
        
        const tagArray = tags.split(',')
        const taggings = await InterestSchema.find({ name: { $in: tagArray } })
        console.log("my taggings in blog",taggings)

        const interestIds = taggings.map(interest => interest._id);

  
        const newBlogPost =  new BlogPost({
          title:title,
          summary:summary,
          tags:interestIds,
          coverImage:filepath,
          content: processedContent,
          author:userId
        });
        const blogCreated = await newBlogPost.save()
   
    
  
  const blogId = blogCreated._id
  const user = await User.findByIdAndUpdate(userId,{ $push: { blogsPublished: blogId } }, { new: true })
  const updatedInterstSchema = await InterestSchema.updateMany(
    { _id: { $in: interestIds } },
    { $push: { blogs: newBlogPost._id } }
  )  
  
  res.status(200).json({message:"Blog created, and updated", user:user})
    
  } catch (error) {
    res.status(400).json({message:"Failed to create Blog, please try again!"})
  }

}



async function processAndSaveImages(content) {
  const $ = cheerio.load(content);

  const imagePromises = $('img').map(async function () {
    const img = $(this);
    const base64ImageData = img.attr('src');
    // const filename = generateUniqueFilename();
    const imageDataRegex = /data:image\/\w+;base64,([^"]+)/;
    const match = base64ImageData.match(imageDataRegex);
    if (match) {
      const extractedData = match[1];
      const objectId = new ObjectId();
      const imageUrl = await saveImage(extractedData, objectId);
      img.attr('src', imageUrl);
    } else {
      console.log('Invalid base64 image data.');
    }

  }).get();

  await Promise.all(imagePromises);

  return $.html();
}




  const getBlog =async(req, res) => {
    try {
      const postId = req.params._id;
      const blogDat = await BlogPost.findById(postId)
      res.status(200).send({blogCont:blogDat});
      
    } catch (error) {
      res.status(500).send('Error retrieving blog post');

    }

  }

  const getALLBlogs = async (req,res)=>{
    try {
      const userId = req.id
      const userDat = await User.findById(userId)
      const userIntersts = userDat.interests
  
      const documents = await InterestSchema.find({ _id: { $in: userIntersts } }).exec()
      const interestIds = documents.map(doc => doc._id);
      const pipeline = [
        {
          $lookup: {
            from: 'blogschemas',
            localField: 'blogs',
            foreignField: '_id',
            as: 'blogings'
          }
        },
        {
          $unwind: '$blogings'
        },
        {
          $sort: {
            'blogings.createdAt': -1
          }
        },
        {
          $group: {
            _id: '$blogings'
          }
        }
      ];
  
      const result = await InterestSchema.aggregate(pipeline);
      res.status(200).json({blogs:result})
  
      
    } catch (error) {
      res.status(400).json({message:"Failed to fetch blogs!"})

    }



  }

  const getUserBlogs = async (req,res)=>{
    try {

      const userId = req.id
      console.log(req.id)
      const userData = await User.findById(userId)
      console.log("userdata in getting blog",userData)
      const blogIds = userData?.blogsPublished
      if(blogIds.length>0){

        console.log("blogs published",blogIds)
        const userPublishedBlogs = await BlogPost.find({_id:{$in:blogIds}})

        return res.status(200).json({userBlogs:userPublishedBlogs})
      }else{
        return res.status(200).json({message:"No blogs published yet!!"})
      }

    } catch (error) {
      res.status(500).json({message:"Failed to fetch Blog data!"})

    }
  }




  async function saveImage(base64ImageData, objectId) {
    try {
      const imageBuffer = Buffer.from(base64ImageData, 'base64');
      const imageStream = new Readable();
      imageStream.push(imageBuffer);
      imageStream.push(null); // Signal the end of the stream
    
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: objectId,
            folder: 'Blog_images',
            resource_type: 'image',
            format: 'png'
          },
          (error, result) => {
            if (error) {
              console.error('Error uploading image to Cloudinary:', error);
              reject(error);
              return;
            }
    
            const imageUrl = result.secure_url;
            console.log('Image uploaded to Cloudinary:', imageUrl);
            resolve(imageUrl);
          }
        );
    
        imageStream.pipe(stream);
      });
      
    } catch (error) {
      res.status(400).json({message:"Failed to upload image!"})
    }

  }
  
  
  


  module.exports = {PostBlog,getBlog,getALLBlogs,getUserBlogs}







