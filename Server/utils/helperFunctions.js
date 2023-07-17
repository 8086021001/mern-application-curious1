const cheerio  = require('cheerio')
const { ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');



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



  module.exports = {
    processAndSaveEditedBlogImages
  }