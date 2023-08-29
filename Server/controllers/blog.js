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
const {processAndSaveEditedBlogImages} = require('../utils/helperFunctions')
const savedblogSchema = require('../models/savedBlogSchema')



cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});




const PostBlog = async(req,res)=>{
  try {

      const userId = req.id
      let paths
      let filepath

      if(req.file){

         paths = req.file.path.slice(7)
         filepath = `https://curiousone.online/${paths}`
      }else if(req.body?.coverImage){
        filepath = req.body?.coverImage

      }

  
    const {title,summary,tags,subscription} = req.body
  
      const  htmlContent = req.body.content
  
  
      const processedContent = await processAndSaveImages(htmlContent);
  
        
        const tagArray = tags.split(',')
        const taggings = await InterestSchema.find({ name: { $in: tagArray } })

        const interestIds = taggings.map(interest => interest._id);

  
        const newBlogPost =  new BlogPost({
          title:title,
          summary:summary,
          tags:interestIds,
          coverImage:filepath,
          content: processedContent,
          author:userId,
          issubscription:subscription

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

const saveBlogAsDraft = async(req,res)=>{
  try {

    console.log("printing all dreaft bodies",req.body)
    console.log("file present",req.file)
    const userId = req.id
    let filepath
    if(req?.file){
          const paths = req.file.path.slice(7)
           filepath = `https://curiousone.online/${paths}`
    }

  const {title,summary,tags} = req.body

    const  htmlContent = req.body.content


    const processedContent = await processAndSaveImages(htmlContent);


    const draftBlogpots =  new savedblogSchema({
      title:title,
      summary:summary,
      tags:tags,
      coverImage:filepath,
      content: processedContent,
      author:userId
    });
    const savedDradt = await draftBlogpots.save()

    const getallSavedBlogs = await savedblogSchema.find({author:userId})

    if(getallSavedBlogs){
      res.status(200).json({savedBlogs:getallSavedBlogs})
    }else{
      res.status(200).json({savedBlogs:[]})
    }
  } catch (error) {
    res.status(500)
  }
}

const getAllDraftedBlogs = async(req,res)=>{
  try {
    const userId = req.id
    const getallSavedBlogs = await savedblogSchema.find({author:userId})
    if(getallSavedBlogs){
      res.status(200).json({savedBlogs:getallSavedBlogs})
    }else{
      res.status(200).json({savedBlogs:[]})
    }

  } catch (error) {
    res.status(500)

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

  


      const pipeline = ([
        {
          $lookup: {
            from: 'interests',
            localField: 'tags',
            foreignField: '_id',
            as: 'interestsData',
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            summary: 1,
            coverImage: 1,
            tags: 1,
            content: 1,
            createdAt: 1,
            interestNames: '$interestsData.name',
            author: 1, 
            likes:1,
            issubscription:1,

          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'authorData',
          },
        },
        {
          $unwind: '$authorData',
        },
        {
          $project: {
            title: 1,
            summary: 1,
            coverImage: 1,
            tags: 1,
            content: 1,
            createdAt: 1,
            interestNames: 1,
            likes:1,
            issubscription:1,
            author: {
              _id: '$authorData._id',
              name: '$authorData.name',
              image: '$authorData.image',
            },
          },
        },
        {
          $sort: {
            createdAt: -1, 
          },
        },
      ]);

  

      const result = await BlogPost.aggregate(pipeline);

      res.status(200).json({blogs:result})
  
      
    } catch (error) {
      res.status(400).json({message:"Failed to fetch blogs!"})

    }



  }

  const getUserBlogs = async (req,res)=>{
    try {

      const userId = req.id
      const userData = await User.findById(userId)
      const blogIds = userData?.blogsPublished
      if(blogIds.length>0){

        const userPublishedBlogs = await BlogPost.find({_id:{$in:blogIds}})

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
      }else{
        res.status(400).json({message:"Failed to update"})
      }
      
    } catch (error) {
      res.status(500).json({message:"Failed!"})


    }
  }

  const getBlogComment = async(req,res)=>{
   
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


      if(commentData.length>0){
        const dataComments = commentData[0].comments

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
  const getSavedBlogs = async(req,res)=>{
    try {
      console.log(req.id)
      const userId = req.id
      const userData = await User.findById(userId)
      const savedBlogId = userData.savedBlogs

      if(savedBlogId.length>0){
        const BlogsData = await BlogPost.find({_id:{$in:savedBlogId}})
        res.status(200).json({blogs:BlogsData})

      }else{
        res.status(200).json({message:"No Blogs available"})
      }


      
    } catch (error) {
      
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
  const MakeLikeSuccess = async(req,res)=>{
    try {
      const {blogId} = req.body.content
      const userId = req.id
      const blogDetails = await BlogPost.findById(blogId)
      if(!blogDetails.likes.some(like=>like.user.equals(new ObjectId(userId)))){
        // console.log("checking with the likes",blogDetails.likes.some(like=>like.user.equals(new ObjectId(userId))))

              const blogData = await BlogPost.findByIdAndUpdate(blogId, {
        $push: { likes: { user: userId } },
      },
      { new: true }
    );
        res.status(200).json({message:"success"})
      }else{
        const blogData = await BlogPost.findByIdAndUpdate(blogId, {
          $pull: { likes: { user: userId } }
        },
        { new: true }
      );
        res.status(200).json({message:"success"})

      }
      
    } catch (error) {
      res.status(400).json({message:"Failed to update!"})

      
    }

  }

  const deleteBlog = async (req,res)=>{
    try {
      const userId = req.id
      const blogId =req.params.blogId
      console.log(blogId,userId)

      const userData = await User.findByIdAndUpdate(userId,{$pull:{blogsPublished:blogId}})
      const blogData = await BlogPost.findByIdAndDelete(blogId)
      res.status(200).json({message:"Blog deleted"})
      
    } catch (error) {
      res.status(400).json({message:"Failed to delete!"})

    }


  }

  const deleteSavedDrafts = async(req,res)=>{
    try {
      console.log("hello in delte saved drafts")
      const userId = req.id
      const blogId =req.params.blogId
      const blogData = await savedblogSchema.findByIdAndDelete(blogId)
      const savedBlogData = await savedblogSchema.find({author:userId})
      res.status(200).json({savedBlogs:savedBlogData})

    } catch (error) {
      res.status(400).json({message:"Failed to delete!"})

    }
  }

  const editMyBlog = async(req,res)=>{
    try {
      const userId= req.body
      const {title,summary,blogId} = req.body
      let paths = null
      let filepath = null
      if(req.file){
        paths = req.file.path.slice(7)
        filepath = `https://curiousone.online/${paths}`
      }
      const htmlContent = req.body.content

      const processdContent = await processAndSaveEditedBlogImages(htmlContent)
      // console.log("This is my processed content",processdContent)
      const updatedFields = {};

if (title) {
  updatedFields.title = title;
}
if (summary) {
  updatedFields.summary = summary;
}
if (filepath) {
  updatedFields.coverImage = filepath;
}
if (processdContent) {
  updatedFields.content = processdContent;
}
      const updatingBlog = await BlogPost.findByIdAndUpdate(blogId,updatedFields,{new:true})
      if(!updatingBlog){
        return res.status(404).json({ message: 'Blog not found.' });
      }
      
      res.status(200).json({blogCont:updatingBlog,message:"Blog updated"})
    } catch (error) {
      
    }

  }

  const getOtherUserBlogs = async(req,res)=>{
    try {

      const otherUserId = req.params.usersId

      const userBlogs = await User.find({_id:otherUserId}).populate('interests').populate('blogsPublished').populate('following').select('-password')
    
      
      res.status(200).json({usersBlogs:userBlogs,message:"Success"})
    } catch (error) {

      
    }
  

  }
  
  
  


  module.exports = {PostBlog,getBlog,getALLBlogs,getUserBlogs,MakeBlogComment,getBlogComment,
    getSearchContent,getSavedBlogs,MakeLikeSuccess,deleteBlog,editMyBlog,getOtherUserBlogs,
    saveBlogAsDraft,getAllDraftedBlogs,deleteSavedDrafts}







