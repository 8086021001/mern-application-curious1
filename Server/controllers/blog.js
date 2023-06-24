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
const interests = require('../models/interests')



cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});






const PostBlog = async(req,res)=>{
  try {
    console.log(req.id);
    //  console.log(req);
   
      const userId = req.id
      console.log(userId)
      console.log(req.body)
      const paths = req.file.path.slice(7)
      const filepath = `http://localhost:5000/${paths}`
      console.log(filepath)
  
    const {title,summary,tags} = req.body
  
  
      const  htmlContent = req.body.content
  
  
      const processedContent = await processAndSaveImages(htmlContent);
  
        console.log(processedContent)
        
        let interestIds
        const taggings = await interests.find({ name: { $in: tags } })
        .then((interests)=>{
           interestIds = interests.map(interest => interest._id);
        })
  
        const newBlogPost = new BlogPost({
          title:title,
          summary:summary,
          tags:interestIds,
          coverImage:filepath,
          content: processedContent,
          author:userId
        });
        const blogCreated = newBlogPost.save()
   
    
  
  console.log(blogCreated)
  const blogId = blogCreated._id
  const user = await User.findByIdAndUpdate(userId,{ $push: { blogsPublished: blogId } }, { new: true })
  console.log(user)
  
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




  const getBlog = (req, res) => {
    const postId = req.params.id;
  
    BlogPost.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: 'Blog post not found' });
        }
  
        res.send(post.content);
      })
      .catch((err) => {
        console.error('Error retrieving blog post:', err);
        res.status(500).send('Error retrieving blog post');
      });
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
            // Handle the uploaded image URL
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
  
  
  


  module.exports = {PostBlog}








  

// $('img').each(function() {
//     const img = $(this);
//     const base64ImageData = img.attr('src');
  
//     const imageBuffer = Buffer.from(base64ImageData, 'base64');
//     const filename = generateUniqueFilename();
//     const savePath = path.join('E:', 'Curious1', 'Server', 'public', 'blogImages', filename);

//     // const savePath = path.join(__dirname, 'public', 'blogImages', filename);
//     // `http://localhost:5000/public/blogImages/${filename}`;
//     // path.join(__dirname, 'public/blogImages', filename);

//     fs.writeFileSync(savePath, imageBuffer);

//     const fileUrl = `http://localhost:5000/public/blogImages/${filename}`;
//     img.attr('src', fileUrl);
//   });