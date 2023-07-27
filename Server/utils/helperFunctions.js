const cheerio  = require('cheerio')
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const streamifier = require('streamifier');




cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


async function processAndSaveEditedBlogImages(content) {
    const $ = cheerio.load(content);
  
    const imagePromises = $('img').map(async function () {
      const img = $(this);
      const src = img.attr('src');
  
      
      if (src.startsWith('https://res.')) {
        return; 
      }
  
      const base64ImageData = src;
      const imageDataRegex = /data:image\/\w+;base64,([^"]+)/;
      const match = base64ImageData.match(imageDataRegex);
      if (match) {
        const extractedData = match[1];
        const objectId = new ObjectId();
        const imageUrl = await saveEditBlogImage(extractedData, objectId);
        img.attr('src', imageUrl);
      } else {
        console.log('Invalid base64 image data.');
      }
  
    }).get();
  
    await Promise.all(imagePromises);
  
    return $.html();
  }

  async function saveEditBlogImage(base64ImageData, objectId) {
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


  async function audioUplodertoCloudinary(originalname,buffer){
    return new Promise((resolve, reject) => {
      const cloudinaryUpload = cloudinary.uploader.upload_stream(
        { resource_type: 'video', public_id: originalname, folder: 'audio' },
        (error, result) => {
          if (error) {
            console.log("Error uploading:", error);
            reject(error); 
          } else {
            const audioUrl = result.secure_url;

            resolve(audioUrl); 
          }
        }
      );
    
      // Pipe the audio buffer to Cloudinary
      const readStream = require('stream').PassThrough();
      readStream.end(buffer);
      readStream.pipe(cloudinaryUpload);
    });
  }





  
  async function chatImageUploadertoCloudinary(originalname, buffer) {
    try {
      console.log("here in img url", originalname, buffer);
  
      const uploadOptions = {
        folder: 'chatImages',
        public_id: originalname,
      };
  
      // Convert buffer to a Readable stream
      const readableStream = streamifier.createReadStream(buffer);
  
      // Upload the image stream to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const cloudinaryUpload = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.log("Error uploading:", error);
            reject(error);
          } else {
            resolve(result);
          }
        });
  
        readableStream.pipe(cloudinaryUpload);
      });
  
      const imgUrl = result.secure_url;
  
      return imgUrl;
    } catch (error) {
      console.error("Error uploading:", error);
      throw error; // Reject the Promise with the error
    }
  }
  
  
  


  async function testUploader(buffer){
    let imageurl
   await cloudinary.uploader.upload(buffer, function(error, result) {
      console.log(result.secure_url, error);
      imageurl =result.secure_url;
    });
    return imageurl
  }



  function generateUniqueName(baseString) {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5); 
    return `${baseString}-${timestamp}-${randomString}`;
  }






  module.exports = {
    processAndSaveEditedBlogImages,
    audioUplodertoCloudinary,
    generateUniqueName,
    testUploader,
    chatImageUploadertoCloudinary
  }
