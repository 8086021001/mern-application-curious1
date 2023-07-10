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

        const userPublishedBlogs = await BlogPost.find({_id:{$in:blogIds}})
        console.log("blogs published",userPublishedBlogs)

        return res.status(200).json({userBlogs:userPublishedBlogs})
      }else{
        return res.status(200).json({message:"No blogs published yet!!"})
      }

    } catch (error) {
      res.status(500).json({message:"Failed to fetch Blog data!"})

    }
  }

  const MakeBlogComment = async (req,res)=>{
    try {
      const blogId = req.body.content.blogId
      const comment = req.body.content.comment
      const userId = req.id
      console.log(blogId,comment,userId)

      const blogData = await BlogPost.findById(blogId)
      // const userData =await User

      if(blogData){
        const newComment = {
          user: userId,
          comment:comment ,
          createdAt: new Date(),
        };
        blogData.comments.push(newComment)
        await blogData.save()
        console.log(blogData)
        res.status(200).json({comments:blogData.comments})
      }
      res.status(400).json({message:"Failed to update"})
      
    } catch (error) {


    }
  }

  const getBlogComment = async(req,res)=>{
   
      console.log("here is the blog idddd",req.params)
      const blogID = req.params.blogId
      const pipeline = [
        {
          $match: { _id: new ObjectId(blogID) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'comments.user',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $unwind: '$comments',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'comments.user',
            foreignField: '_id',
            as: 'comments.user',
          },
        },
        {
          $unwind: '$comments.user',
        },
        {
          $sort: { 'comments.createdAt': -1 },
        },
        {
          $group: {
            _id: 0,
            comments: {
              $push: {
                BlogId:{$toString:'$_id'},
                comment: '$comments.comment',
                commentId:{$toString:'$comments._id'},
                userID:{$toString:'$comments.user._id'},
                authorId:{$toString:'$author'},
                username: '$comments.user.name',
                userProfile: '$comments.user.image',
              },
            },
          },
        },
      ]
      

      const commentData = await BlogPost.aggregate(pipeline)
      console.log("here is the comment dataa",commentData)


      if(commentData.length>0){
        const dataComments = commentData[0].comments

        console.log("here is the comment data",dataComments)
        res.status(200).json({comments:dataComments})
      }else{
        res.status(400).json({message:"Failed! please refresh"})
      }


  }

  const getSearchContent = async(req,res)=>{
    try {
      const userId = req.id
      console.log("hello",req.params.searchText)
      await BlogPost.createIndexes({ title: 'text',summary:'text' });

      const blogdata = await BlogPost.aggregate([
        {
          $match: {
            $text: { $search: req.params.searchText }
          }
        },
        {
          $addFields: {
            metaValue: { $meta: "textScore" } 
          }
        },
        {
          $sort: {
            metaValue: -1 
          }
        }
      ]);    
      
      if (blogdata.length === 0) {
        return res.status(200).json({ message: "No search results found." });
      }
      
      
      res.status(200).json({blogs:blogdata})

    } catch (error) {
      res.status(500).json({message:"Failed!"})

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
  
  
  


  module.exports = {PostBlog,getBlog,getALLBlogs,getUserBlogs,MakeBlogComment,getBlogComment,getSearchContent}







